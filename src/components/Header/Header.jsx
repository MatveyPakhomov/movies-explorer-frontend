import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/logo.svg";

export default function Header({ onNavigation, loggedIn }) {
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
          to={!loggedIn ? "/signup" : "/movies"}
          className={
            mainPage ? "header__link" : "header__link header__link_big-size"
          }
        >
          {!loggedIn ? "Регистрация" : "Фильмы"}
        </Link>
        {loggedIn ? (
          <Link
            to={"/saved-movies"}
            className={
              mainPage
                ? "header__link"
                : "header__link_saved-movies header__link header__link_big-size"
            }
          >
            {"Сохраненные Фильмы"}
          </Link>
        ) : null}
      </section>
      <section className="header__profile-section">
        <Link
          to={!loggedIn ? "/signin" : "/profile"}
          className={
            mainPage ? "header__link-button" : "header__link-button_grey"
          }
        >
          {!loggedIn ? "Войти" : "Аккаунт"}
        </Link>
      </section>
    </>
  );

  if (!mainPage && windowWidth) {
    headerRightButtons = (
      <button className="header__burger-button" onClick={onNavigation}></button>
    );
  }

  return match ? (
    <header className={mainPage ? "header" : "header header-white"}>
      <section className="header__section">
        <Link to={"/"} className="header__link header__logo">
          <img src={headerLogo} alt="Логотип" className="header__logo" />
        </Link>
        {headerRightButtons}
      </section>
    </header>
  ) : null;
}
