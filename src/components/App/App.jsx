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
import NavigateHeaderPopup from "../NavigateHeaderPopup/NavigateHeaderPopup";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";

export default function App() {
  const [isNavigateHeaderPopupOpen, setIsNavigateHeaderPopupOpen] =
    React.useState(false);
  const [currentUser] = React.useState({});
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/signin");
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleNavigateHeaderPopupClick() {
    setIsNavigateHeaderPopupOpen(true);
  }

  function closePopup() {
    setIsNavigateHeaderPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLogin={handleLoginClick}
          onProfile={handleProfileClick}
          onNavigatePopup={handleNavigateHeaderPopupClick}
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
        <NavigateHeaderPopup
          isOpen={isNavigateHeaderPopupOpen}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
