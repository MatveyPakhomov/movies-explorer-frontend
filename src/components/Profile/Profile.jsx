import React from "react";
import "./Profile.css";

export default function Profile(props) {
  return (
    <section className="profile content__profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="register__form" onSubmit={props.handleSubmit}>
        <input
          required
          id="name"
          name="name"
          type="text"
          value={profile.name}
          className="register__input"
          placeholder="Имя"
          onChange={props.handleChange}
        />
        <input
          required
          id="email"
          name="email"
          type="email"
          value={profile.email}
          className="register__input"
          placeholder="E-mail"
          onChange={props.handleChange}
        />
      </form>
      <div className="profile__buttons-section">
        <button
          type="button"
          onClick={props}
          aria-label="Кнопка: редактировать"
          className="profile__edit-button"
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={props}
          aria-label="Кнопка: выйти из аккаунта"
          className="profile__logout-button"
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
