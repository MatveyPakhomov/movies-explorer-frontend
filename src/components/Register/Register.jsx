import React from "react";
import "./Register.css";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";

function renderTop(props) {
  return (
    <div className={`${props.component}__top-section top__section`}>
      <Link
        to={"/"}
        className={`${props.component}__link top__link"`}
        onClick={props.onAbout}
      >
        <img
          src={props.headerLogo}
          alt="Логотип"
          className={`${props.component}__logo top__logo`}
        />
      </Link>
      <h2 className={`${props.component}__title top__title`}>{props.title}</h2>
    </div>
  );
}

function renderInput(props) {
  return (
    <section className={`${props.component}__input-section input__section`}>
      <label
        htmlFor={props.for}
        className={`${props.component}__input-label input__label`}
      >
        {props.label}
      </label>
      <input
        required
        id={props.id}
        name={props.name}
        type={props.type}
        defaultValue={props.value}
        className={`${props.component}__input input`}
        onChange={props.handleChange}
      />
      <span
        id={`${props.component}-name-error`}
        className={`${props.component}__input_error input__error-label`}
      />
    </section>
  );
}

function renderBottom(props) {
  return (
    <div className={`${props.component}__bottom-section bottom__container`}>
      <button
        type="submit"
        className={`${props.component}__submit-button bottom__submit-button`}
      >
        {props.submitButton}
      </button>
      <section
        className={`${props.component}__${props.action}-section bottom__section`}
      >
        <p
          className={`${props.component}__${props.action}-title bottom__title`}
        >
          {props.actionTitle}
        </p>
        <Link
          to={props.component === "register" ? "/signin" : "/signup"}
          className={`${props.component}__${props.action}-link bottom__link`}
        >
          {props.actionButton}
        </Link>
      </section>
    </div>
  );
}

export default function Register(onAbout, handleChange) {
  const registerTop = {
    component: "register",
    headerLogo: headerLogo,
    onAbout: onAbout,
    title: "Добро пожаловать!",
  };

  const emailInput = {
    for: "email",
    component: "register",
    label: "E-mail",
    id: "email",
    name: "email",
    type: "email",
    value: "pochta@yandex.ru",
    handleChange: handleChange,
  };

  const nameInput = {
    for: "name",
    component: "register",
    label: "Имя",
    id: "name",
    name: "name",
    type: "text",
    value: "Виталий",
    handleChange: handleChange,
  };

  const passwordInput = {
    for: "password",
    component: "register",
    label: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    value: "verystrongpassword",
    handleChange: handleChange,
  };

  const registerBottom = {
    component: "register",
    submitButton: "Зарегистрироваться",
    action: "login",
    actionTitle: "Уже зарегистрированы?",
    actionButton: "Войти",
  };

  return (
    <section className="register">
      <div className="register__section">
        {renderTop(registerTop)}
        <form className="register__form">
          {renderInput(nameInput)}
          {renderInput(emailInput)}
          {renderInput(passwordInput)}
        </form>
      </div>
      {renderBottom(registerBottom)}
    </section>
  );
}

export { renderTop, renderInput, renderBottom };
