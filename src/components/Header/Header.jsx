import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";

export default function Header(
  linkTitle,
  onMovies,
  onSavedMovies,
  onProfile,
  onLinksPopup,
) {

  return (
    <header className="header">
      <section className="header__section">
        <img
          src={headerLogo}
          alt="Логотип"
          className="header__logo"
        />
        <section className="header__links-section">
          {/* <button
            type="button"
            onClick={onLinksPopup}
            aria-label="Кнопка бургер"
            className="header__links-button"
          /> */}
          <Link
            to={"/movies" || "/signup"}
            className="header__link"
            onClick={onMovies}
          >
            {"Регистрация" || "Фильмы"}
          </Link>
          {/* <Link
            to={"/saved-movies" || "/signin"}
            className="header__link header__login-button"
            onClick={onSavedMovies}
          >
            {"Войти" || "Сохранённые фильмы"}
          </Link> */}
        </section>
        <section className="header__profile-section">
          <button
            type="button"
            onClick={onLinksPopup}
            aria-label={"Кнопка Войти" || "Кнопка Аккаунт"}
            className="header__link-button"
          >{"Войти" || "Аккаунт"}</button>
        </section>
      </section>
    </header>
  );
}
