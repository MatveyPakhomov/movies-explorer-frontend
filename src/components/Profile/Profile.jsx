import React from "react";
import "./Profile.css";

export default function Profile(props) {
  return (
    <section className="profile">
      <div className="profile__section">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__input-section">
          <p htmlFor="name" className="profile__input-label">
            Имя
          </p>
          <input
            required
            id="name"
            name="name"
            type="text"
            defaultValue={profile.name}
            className="profile__input"
            // placeholder="Имя"
          />
        </form>
        <form className="profile__input-section">
          <p htmlFor="email" className="profile__input-label">
            E-mail
          </p>
          <input
            required
            id="email"
            name="email"
            type="email"
            defaultValue={profile.email}
            className="profile__input"
            // placeholder="E-mail"
          />
        </form>
      </div>
      <div className="profile__buttons-section">
        <button
          type="button"
          onClick={props.onClick}
          aria-label="Кнопка: редактировать"
          className="profile__button profile__button_edit"
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={props.onClick}
          aria-label="Кнопка: выйти из аккаунта"
          className="profile__button profile__button_logout"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

const profile = {
  name: "Виталий",
  email: "pochta@yandex.ru",
};
