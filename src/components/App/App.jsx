import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../../index.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Result404 from "../Result404/Result404";
import PopupWithForm from "../PopupWithForm";
import ImagePopup from "../ImagePopup";
import api from "../../utils/api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { cardConfig } from "../../utils/utils";
import InfoTooltip from "../InfoTooltip";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth";

export default function App() {
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userInfo, cardList]) => {
          setCurrentUser(userInfo);
          setCards(cardList.map((item) => cardConfig(item)));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setSelectedCard(null);
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // function handleUpdateUser(data) { // возможно понадобится
  //   api
  //     .setUserInfo(data)
  //     .then((res) => {
  //       setCurrentUser(res);
  //       closeAllPopups();
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function handleUpdateAvatar(data) { // возможно понадобится
  //   api
  //     .setUserAvatar(data)
  //     .then((res) => {
  //       setCurrentUser(res);
  //       closeAllPopups();
  //     })
  //     .catch((err) => console.log(err));
  // }

  function handleCardLike(props) {
    const isLiked = props.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(props.cardId, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => {
            return item.cardId === props.cardId ? cardConfig(newCard) : item;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(props) {
    api
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

  // function handleAddPlaceSubmit(data) { // возможно понадобится
  //   api
  //     .addNewCard(data)
  //     .then((newCard) => {
  //       setCards(() => [cardConfig(newCard), ...cards]);
  //       closeAllPopups();
  //     })
  //     .catch((err) => console.log(err));
  // }

  function handleLogin(email, password) {
    return auth
      .login(email, password)
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
        navigate("/signin");
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
      .getProfile()
      .then((res) => {
        setLoggedIn(true);
        navigate("/");
        setUserData({
          email: res.email,
          title: "Выйти",
          link: "/signin",
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
        navigate("/signin");
        setUserData({
          title: "Регистрация",
          link: "/signup",
        });
      });
    }
    // колхоз?
    setUserData({
      title: "Регистрация",
      link: "/signup",
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header userData={userData} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/movies"
              element={<Movies />}
            />
            <Route
              path="/saved-movies"
              element={<SavedMovies />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} />}
              />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="*"
              element={<Result404 />}
            />
          </Routes>
          <Footer />
          <PopupWithForm
            name="delete-place"
            containerName="popup__container_type_delete-place"
            title="Вы уверены?"
            submitButtonName="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            data={infoTooltipData}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
