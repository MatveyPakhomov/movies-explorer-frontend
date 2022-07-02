import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "../../index.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import { movieConfig } from "../../utils/utils";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import moviesApi from "../../utils/MoviesApi";

export default function App() {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [localMovies, setLocalMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isMoviesNotFound, setIsMoviesNotFound] = React.useState(false);
  const [isRequestError, setIsRequestError] = React.useState(false);
  const [filterCheckbox, setFilterCheckbox] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keyup", handleEscClose);
    return () => document.removeEventListener("keyup", handleEscClose);
  });

  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleOverlayClose);
    return () => document.removeEventListener("mousedown", handleOverlayClose);
  }, []);

  function handleNavigationClick() {
    setIsNavigationOpen(true);
  }

  React.useEffect(() => {
    if (loggedIn) {
      handleGetSavedMovies();
      isMoviesDownloaded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMoviesDownloaded = React.useCallback(() => {
    const movies = localStorage.getItem("movies");
    if (movies) {
      setLocalMovies(JSON.parse(movies));
    } else {
      handleGetMovies();
    }
  }, []);

  function handleGetMovies() {
    moviesApi
      .getMovies()
      .then((moviesList) => {
        const movies = moviesList.map((movie) => {
          return movieConfig(movie);
        });
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        const localMovies = localStorage.getItem("movies");
        setLocalMovies(JSON.parse(localMovies));
      });
  }

  function handleSearchRequest(movies, textRequest) {
    const searchResult = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(textRequest.toLowerCase());
    });
    if (!filterCheckbox) {
      return searchResult;
    } else {
      return filterShortMovies(searchResult);
    }
  }

  function filterShortMovies(movies) {
    return movies.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  function handleGetSavedMovies() {
    setIsPreloaderOpen(true);
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(
          movies
            .slice()
            .reverse()
            .filter((item) => item.owner === currentUser._id)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .setSavedMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie)
      .then(() => {
        const tempSavedMovies = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        setSavedMovies(tempSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkIsLiked(movie) {
    const isSaved = savedMovies.some((item) => item.movieId === movie.movieId);
    return isSaved;
  }

  function handleLikedMovie(movie) {
    const isSaved = checkIsLiked(movie);
    if (!isSaved) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(movie);
    }
  }

  function handleFilterCheckboxChange() {
    setFilterCheckbox(!filterCheckbox);
    localStorage.setItem("filterCheckbox", JSON.stringify(!filterCheckbox));
  }

  function closePopup() {
    setIsNavigationOpen(false);
  }

  function closeAllPopups() {
    setInfoTooltipData({});
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "success",
        });
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  function handleLogin(inputValues) {
    return auth
      .authorize(inputValues)
      .then(() => {
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  function handleRegister(inputValues) {
    return auth
      .register(inputValues)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "success",
        });
        navigate("/movies");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  function getUserInfo() {
    auth
      .getContent()
      .then((res) => {
        const { name, email, _id } = res;
        setCurrentUser({ name, email, _id });
        setLoggedIn(true);
        navigate("/movies");
        pathname === "/signin" || pathname === "/signup"
          ? navigate("/movies")
          : navigate(location.pathname);
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    const jwt = document.cookie.slice(4);

    if (jwt) {
      auth.logout().then(() => {
        setLoggedIn(false);
        navigate("/");
        localStorage.clear();
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header onNavigation={handleNavigationClick} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute component={Main} loggedIn={loggedIn} />}
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                handleCheckboxChange={handleFilterCheckboxChange}
                isMoviesNotFound={isMoviesNotFound}
                setIsMoviesNotFound={setIsMoviesNotFound}
                isRequestError={isRequestError}
                setIsRequestError={setIsRequestError}
                handleSearchRequest={handleSearchRequest}
                handleSaveMovie={handleSaveMovie}
                localMovies={localMovies}
                filterCheckbox={filterCheckbox}
                setFilterCheckbox={setFilterCheckbox}
                filterShortMovies={filterShortMovies}
                handleDeleteMovie={handleDeleteMovie}
                handleLikedMovie={handleLikedMovie}
                savedMovies={savedMovies}
                isPreloaderOpen={isPreloaderOpen}
                setIsPreloaderOpen={setIsPreloaderOpen}
                checkIsLiked={checkIsLiked}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                isMoviesNotFound={isMoviesNotFound}
                setIsMoviesNotFound={setIsMoviesNotFound}
                isRequestError={isRequestError}
                setIsRequestError={setIsRequestError}
                handleSearchRequest={handleSearchRequest}
                handleSaveMovie={handleSaveMovie}
                localMovies={localMovies}
                filterCheckbox={filterCheckbox}
                setFilterCheckbox={setFilterCheckbox}
                filterShortMovies={filterShortMovies}
                handleDeleteMovie={handleDeleteMovie}
                handleLikedMovie={handleLikedMovie}
                savedMovies={savedMovies}
                isPreloaderOpen={isPreloaderOpen}
                setIsPreloaderOpen={setIsPreloaderOpen}
                checkIsLiked={checkIsLiked}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                handleUpdateUser={handleUpdateUser}
                logout={handleSignOut}
              />
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={!loggedIn ? <Navigate to="/signin" /> : <PageNotFound />}
          />
        </Routes>
        <Footer />
        <Navigation isOpen={isNavigationOpen} onClose={closePopup} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          data={infoTooltipData}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
