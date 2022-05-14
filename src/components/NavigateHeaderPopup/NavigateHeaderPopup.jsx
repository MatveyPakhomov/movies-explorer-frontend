import React from "react";
import "./NavigateHeaderPopup.css";
import { Link } from "react-router-dom";

export default function NavigateHeaderPopup({
  onProfile,
  onMain,
  onMovies,
  onSavedMovies,
  onClose,
  isOpen,
}) {

  return (
    <section
      className={`navigateHeaderPopup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="navigateHeaderPopup__container">
        <button
          type="button"
          onClick={onClose}
          aria-label="Кнопка: закрыть"
          className="navigateHeaderPopup__close-button"
        ></button>
        <section className={"navigateHeaderPopup__links-section"}>
          <Link
            to={"/"}
            className={"navigateHeaderPopup__link"}
            onClick={onMain}
          >
            {"Главная"}
          </Link>
          <Link
            to={"/movies"}
            className={"navigateHeaderPopup__link"}
            onClick={onMovies}
          >
            {"Фильмы"}
          </Link>
          <Link
            to={"/saved-movies"}
            className={"navigateHeaderPopup__link"}
            onClick={onSavedMovies}
          >
            {"Сохранённые фильмы"}
          </Link>
        </section>
        <section className="navigateHeaderPopup__profile-section">
          <button
            type="button"
            onClick={onProfile}
            aria-label={"Кнопка Аккаунт"}
            className={"navigateHeaderPopup__button header__link-button_grey"}
          >
            {"Аккаунт"}
          </button>
        </section>
      </div>
    </section>
  );
}
