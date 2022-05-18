import React from "react";
import "./Login.css";
import "../Register/Register.css";
import headerLogo from "../../images/logo.svg";
import { renderTop, renderInput, renderBottom } from "../Register/Register";

export default function Login(onAbout, handleChange, onLogin, onRegister) {
  const loginTop = {
    component: "login",
    headerLogo: headerLogo,
    onAbout: onAbout,
    title: "Рады видеть!",
  };

  const emailInput = {
    for: "email",
    component: "login",
    label: "E-mail",
    id: "email",
    name: "email",
    type: "email",
    value: "pochta@yandex.ru",
    handleChange: handleChange,
  };

  const passwordInput = {
    for: "password",
    component: "login",
    label: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    value: "verystrongpassword",
    handleChange: handleChange,
  };

  const loginBottom = {
    component: "login",
    submitButton: "Войти",
    action: "register",
    actionTitle: "Ещё не зарегистрированы?",
    actionButton: "Регистрация",
  };

  return (
    <section className="login">
      <div className="login__section">
        {renderTop(loginTop)}
        <form className="login__form">
          {renderInput(emailInput)}
          {renderInput(passwordInput)}
        </form>
      </div>
      {renderBottom(loginBottom)}
    </section>
  );
}
