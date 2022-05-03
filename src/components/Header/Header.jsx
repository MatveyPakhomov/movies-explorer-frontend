import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/logo.svg";

export default function Header({
  onLogin,
  onProfile,
  onRegister,
  onAbout,
  onSavedMovies,
  onNavigatePopup,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const arr = ["/", "/movies", "/saved-movies", "/profile"];
  const match = arr.includes(pathname, 0);
  const [windowWidth, seWindowWidth] = useState(
    window.matchMedia("(max-width: 950px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 950px)")
      .addEventListener("change", (e) => seWindowWidth(e.matches));
  }, [windowWidth]);

  const mainPage = location.pathname === "/";
  let savedMoviesLink;

  if (!mainPage) {
    savedMoviesLink = (
      <Link
        to={"/saved-movies"}
        className={"header__link_saved-movies"}
        onClick={onSavedMovies}
      >
        {"Сохраненные Фильмы"}
      </Link>
    );
  } else savedMoviesLink = null;
  let headerRightButtons = (
    <>
      <section
        className={
          mainPage
            ? "header__links-section"
            : "header__links-section header__links-section_big-margin"
        }
      >
        <Link
          to={mainPage ? "/signup" : "/movies"}
          className={
            mainPage ? "header__link" : "header__link header__link_big-size"
          }
          onClick={onRegister}
        >
          {mainPage ? "Регистрация" : "Фильмы"}
        </Link>
        {savedMoviesLink}
      </section>
      <section className="header__profile-section">
        <button
          type="button"
          onClick={mainPage ? onLogin : onProfile}
          aria-label={mainPage ? "Кнопка Войти" : "Кнопка Аккаунт"}
          className={
            mainPage ? "header__link-button" : "header__link-button_grey"
          }
        >
          {mainPage ? "Войти" : "Аккаунт"}
        </button>
      </section>
    </>
  );

  if (!mainPage && windowWidth) {
    headerRightButtons = <button className="header__burger-button" onClick={onNavigatePopup}></button>;
  }

  return match ? (
    <header className={mainPage ? "header" : "header header-white"}>
      <section className="header__section">
        <Link to={"/"} className="header__link header__logo" onClick={onAbout}>
          <img src={headerLogo} alt="Логотип" className="header__logo" />
        </Link>
        {headerRightButtons}
      </section>
    </header>
  ) : null;
}
