import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { useFormWithValidation } from "../../hooks/useForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { regex } from "../../utils/utils";

export default function Profile({ handleUpdateUser, logout }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (values.name !== undefined) {
      setName(values.name);
    }
    if (values.email !== undefined) {
      setEmail(values.email);
    }
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({ name, email });
  }

  return (
    <section className="profile">
      <div className="profile__section">
        <h1 className="profile__title">{`Привет, ${
          currentUser.name || ""
        }!`}</h1>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <p htmlFor="name" className="profile__input-label">
            Имя
          </p>
          <section className="profile__input-section">
            <input
              required
              id="name"
              name="name"
              type="text"
              className="profile__input"
              placeholder="Имя"
              onChange={handleChange}
              pattern={regex.name}
              minLength={2}
              maxLength={200}
              value={name || ""}
            />
            <span id="profile-name-error" className="profile__error-label_top">
              {errors.name || ""}
            </span>
          </section>
        </form>
        <form className="profile__form" onSubmit={handleSubmit}>
          <p htmlFor="email" className="profile__input-label">
            E-mail
          </p>
          <section className="profile__input-section">
            <input
              required
              id="email"
              name="email"
              type="email"
              className="profile__input"
              placeholder="E-mail"
              onChange={handleChange}
              pattern={regex.email}
              value={email || ""}
            />
            <span id="profile-name-error" className="profile__error-label">
              {errors.email || ""}
            </span>
          </section>
        </form>
      </div>
      <div className="profile__buttons-section">
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="Кнопка: редактировать"
          className="profile__button profile__button_edit"
          disabled={
            !isValid ||
            (name === currentUser.name && email === currentUser.email)
          }
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={logout}
          aria-label="Кнопка: выйти из аккаунта"
          className="profile__button profile__button_logout"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}
