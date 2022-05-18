import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation({
  onProfile,
  onMain,
  onMovies,
  onSavedMovies,
  onClose,
  isOpen,
}) {

  return (
    <section
      className={`navigation ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="navigation__container">
        <button
          type="button"
          onClick={onClose}
          aria-label="Кнопка: закрыть"
          className="navigation__close-button"
        ></button>
        <section className={"navigation__links-section"}>
          <Link
            to={"/"}
            className={"navigation__link"}
            onClick={onMain}
          >
            {"Главная"}
          </Link>
          <Link
            to={"/movies"}
            className={"navigation__link"}
            onClick={onMovies}
          >
            {"Фильмы"}
          </Link>
          <Link
            to={"/saved-movies"}
            className={"navigation__link"}
            onClick={onSavedMovies}
          >
            {"Сохранённые фильмы"}
          </Link>
        </section>
        <section className="navigation__profile-section">
          <button
            type="button"
            onClick={onProfile}
            aria-label={"Кнопка Аккаунт"}
            className={"navigation__button header__link-button_grey"}
          >
            {"Аккаунт"}
          </button>
        </section>
      </div>
    </section>
  );
}
