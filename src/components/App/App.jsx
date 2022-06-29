import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import { useFormWithValidation } from "../../hooks/useForm";
// import moviesApi from "../../utils/MoviesApi";

export default function App() {
  const localStorageMovies = (JSON.parse(localStorage.getItem("searchMovie"))).movies;
  const localStorageFilterCheckbox = (JSON.parse(localStorage.getItem("searchMovie"))).filterCheckbox;
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState(localStorageMovies || []);
  // const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isMoviesNotFound, setIsMoviesNotFound] = React.useState(false);
  const [isRequestError, setIsRequestError] = React.useState(false);
  const [filterCheckbox, setFilterCheckbox] = React.useState(localStorageFilterCheckbox || false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});
  const navigate = useNavigate();
  const { resetForm } = useFormWithValidation();
  function handleNavigationClick() {
    setIsNavigationOpen(true);
  }
  console.log(JSON.parse(localStorage.getItem("searchMovie")), movies);

  // React.useEffect(() => {
  //   moviesApi
  //     .getMoviesList()
  //     .then((moviesData) => {
  //       setMovies(moviesData);
  //     })
  //     .catch((err) => console.log(err))
  // }, []);

  function handleFilterCheckboxChange() {
    setFilterCheckbox(!filterCheckbox);
  }

  function closePopup() {
    setIsNavigationOpen(false);
  }

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setInfoTooltipData({});
  }

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

  function handleUpdateUser(data) {
    mainApi
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleMovieLike(props) {
    const isLiked = props.likes.some((i) => i._id === currentUser._id);

    mainApi
      .changeLikeCardStatus(props.cardId, isLiked)
      .then((newCard) => {
        setMovies((state) =>
          state.map((item) => {
            return item.cardId === props.cardId ? movieConfig(newCard) : item;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleMovieDelete(props) {
    mainApi
      .deleteMovie(props.cardId)
      .then(() => {
        setMovies((state) =>
          state.filter((item) => {
            return item.cardId !== props.cardId;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleSaveMovie(data) {
    mainApi
      .saveMovie(data)
      .then((newCard) => {
        setMovies(() => [movieConfig(newCard), ...movies]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
    console.log("privet");
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "success",
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          className: "fail",
        });
        console.log(err);
      });
  }

  function getAuthUserInfo() {
    auth
      .getContent()
      .then((res) => {
        setLoggedIn(true);
        navigate("/");
        setUserData({
          email: res.email,
          title: "Выйти",
          link: "/sign-in",
        });
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    const jwt = document.cookie.slice(4);
    if (jwt) {
      getAuthUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleSignOut() {
    const jwt = document.cookie.slice(4);

    if (jwt) {
      auth.logout().then(() => {
        setLoggedIn(false);
        navigate("/sign-in");
        setUserData({
          title: "Регистрация",
          link: "/sign-up",
        });
      });
    }
    // колхоз?
    setUserData({
      title: "Регистрация",
      link: "/sign-up",
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header onNavigation={handleNavigationClick} onClose={closePopup} />
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Main} />} />
          <Route
            path="/movies"
            element={
              <Movies
                movies={movies}
                filterCheckbox={filterCheckbox}
                handleCheckboxChange={handleFilterCheckboxChange}
                isPreloaderOpen={isPreloaderOpen}
                isMoviesNotFound={isMoviesNotFound}
                setIsPreloaderOpen={setIsPreloaderOpen}
                setMovies={setMovies}
                setIsMoviesNotFound={setIsMoviesNotFound}
                isRequestError={isRequestError}
                setIsRequestError={setIsRequestError}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                movies={movies}
                filterCheckbox={filterCheckbox}
                handleCheckboxChange={handleFilterCheckboxChange}
                isPreloaderOpen={isPreloaderOpen}
                isMoviesNotFound={isMoviesNotFound}
                setIsPreloaderOpen={setIsPreloaderOpen}
                setMovies={setMovies}
                setIsMoviesNotFound={setIsMoviesNotFound}
                isRequestError={isRequestError}
                setIsRequestError={setIsRequestError}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}
