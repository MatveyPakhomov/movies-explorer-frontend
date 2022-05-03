import React from "react";
import "./Profile.css";

export default function Profile(props) {
  return (
    <section className="profile content__profile">
      <button
        type="button"
        onClick={props}
        aria-label="Кнопка: поменять аватар"
        className="profile__avatar-edit-button"
      >
        <p>СТРАНИЦА ПРОФИЛЯ, ПОКА ЧТО ПУСТАЯ</p>
      </button>
      <div className="profile__info">
        <h1 className="profile__title">{"Жак-Ив Кусто"}</h1>
        <button
          type="button"
          onClick={props}
          aria-label="Кнопка: редактировать"
          className="profile__edit-button"
        ></button>
        <p className="profile__subtitle">{"Исследователь океана"}</p>
      </div>
      <button
        type="button"
        onClick={props}
        aria-label="Кнопка: добавить место"
        className="profile__add-button"
      ></button>
    </section>
  );
}
