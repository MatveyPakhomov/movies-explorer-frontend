import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "../../index.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
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

export default function App() {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/signin");
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleNavigationClick() {
    setIsNavigationOpen(true);
  }

  function closePopup() {
    setIsNavigationOpen(false);
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userInfo, cardList]) => {
          setCurrentUser(userInfo);
          setCards(cardList.map((item) => movieConfig(item)));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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

  function handleCardLike(props) {
    const isLiked = props.likes.some((i) => i._id === currentUser._id);

    mainApi
      .changeLikeCardStatus(props.cardId, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => {
            return item.cardId === props.cardId ? movieConfig(newCard) : item;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(props) {
    mainApi
      .deleteCard(props.cardId)
      .then(() => {
        setCards((state) =>
          state.filter((item) => {
            return item.cardId !== props.cardId;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    mainApi
      .addNewCard(data)
      .then((newCard) => {
        setCards(() => [movieConfig(newCard), ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
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
        <Header
          onLogin={handleLoginClick}
          onProfile={handleProfileClick}
          onNavigation={handleNavigationClick}
          onClose={closePopup}
        />
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Main} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<Movies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <Navigation
          isOpen={isNavigationOpen}
          onClose={closePopup}
          onProfile={handleProfileClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
