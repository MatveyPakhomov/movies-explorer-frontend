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
  const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] =
    React.useState(false);
  const [isRequestError, setIsRequestError] = React.useState(false);
  const [filterCheckbox, setFilterCheckbox] = React.useState(false);
  const [filterShortMoviesCheckbox, setFilterShortMoviesCheckbox] =
    React.useState(false);
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
      isMoviesDownloaded();
      handleGetSavedMovies();
      getUserInfo();
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
      handleGetMovies();
      setLocalMovies(JSON.parse(movies));
    } else {
      handleGetMovies();
    }
  }, []);

  function handleGetMovies() {
    setIsPreloaderOpen(true);
    moviesApi
      .getMovies()
      .then((moviesList) => {
        setIsMoviesNotFound(false);
        const movies = moviesList.map((movie) => {
          return movieConfig(movie);
        });
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        setIsRequestError(true);
        console.log(err);
      })
      .finally(() => {
        const localMovies = localStorage.getItem("movies");
        setLocalMovies(JSON.parse(localMovies));
      });
  }

  function handleSearchRequest(movies, textRequest) {
    const searchResult = movies.filter((movie) => {
      const movieTitle = movie.nameRU.toLowerCase();
      if (movieTitle.includes(textRequest.toLowerCase())) {
        return movie;
      } else return null;
    });
    if (!searchResult.length && pathname === "/movies") {
      setIsMoviesNotFound(true);
    }
    if (!searchResult.length && pathname === "/saved-movies") {
      setIsSavedMoviesNotFound(true);
    }
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
        setIsSavedMoviesNotFound(false);
        setSavedMovies(movies.filter((item) => item.owner === currentUser._id));
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
        setInfoTooltipData({
          className: "fail",
          message: "errorMessage",
        });
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
    if (pathname === "/movies") {
      setFilterCheckbox(!filterCheckbox);
      localStorage.setItem("filterCheckbox", JSON.stringify(!filterCheckbox));
    }
    if (pathname === "/saved-movies") {
      setFilterShortMoviesCheckbox(!filterShortMoviesCheckbox);
      localStorage.setItem(
        "filterShortMoviesCheckbox",
        JSON.stringify(!filterShortMoviesCheckbox)
      );
    }
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
          message: "userEditSuccess",
        });
        setCurrentUser(res);
        setTimeout(() => setIsInfoTooltipOpen(false), 1500);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
          message: "errorMessage",
        });
        console.log(err);
        setTimeout(() => setIsInfoTooltipOpen(false), 1500);
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
          message: "errorMessage",
        });
        console.log(err);
        setTimeout(() => setIsInfoTooltipOpen(false), 1500);
      });
  }

  function handleRegister(inputValues) {
    return auth
      .register(inputValues)
      .then(() => {
        setLoggedIn(true);
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "success",
          message: "registerSuccess",
        });
        navigate("/movies");
        setTimeout(() => setIsInfoTooltipOpen(false), 1500);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
          message: "errorMessage",
        });
        console.log(err);
        setTimeout(() => setIsInfoTooltipOpen(false), 1500);
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
          : navigate(pathname);
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    auth
      .logout()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header onNavigation={handleNavigationClick} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
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
                handleCheckboxChange={handleFilterCheckboxChange}
                isMoviesNotFound={isSavedMoviesNotFound}
                setIsMoviesNotFound={setIsSavedMoviesNotFound}
                isRequestError={isRequestError}
                setIsRequestError={setIsRequestError}
                handleSearchRequest={handleSearchRequest}
                handleSaveMovie={handleSaveMovie}
                localMovies={localMovies}
                filterCheckbox={filterShortMoviesCheckbox}
                setFilterCheckbox={setFilterCheckbox}
                filterShortMovies={filterShortMovies}
                handleDeleteMovie={handleDeleteMovie}
                handleLikedMovie={handleLikedMovie}
                savedMovies={savedMovies}
                isPreloaderOpen={isPreloaderOpen}
                setIsPreloaderOpen={setIsPreloaderOpen}
                checkIsLiked={checkIsLiked}
                handleGetSavedMovies={handleGetSavedMovies}
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
