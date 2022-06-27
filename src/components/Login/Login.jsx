import React from "react";
import "./Login.css";
import "../Register/Register.css";
import headerLogo from "../../images/logo.svg";
import { renderTop, renderInput, renderBottom } from "../SimpleForm/SimpleForm";
import { useForm } from "../../hooks/useForm";

export default function Login(onLogin) {
  const { values, handleChange } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  const loginTop = {
    component: "login",
    headerLogo: headerLogo,
    title: "Рады видеть!",
  };

  const emailInput = {
    for: "email",
    component: "login",
    label: "E-mail",
    id: "email",
    name: "email",
    type: "email",
    value: values.email,
    handleChange: handleChange,
  };

  const passwordInput = {
    for: "password",
    component: "login",
    label: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    value: values.password,
    handleChange: handleChange,
  };

  const loginBottom = {
    component: "login",
    submitButton: "Войти",
    action: "register",
    actionTitle: "Ещё не зарегистрированы?",
    actionButton: "Регистрация",
    onClick: handleSubmit,
  };

  return (
    <section className="login">
      {renderTop(loginTop)}
      <form className="login__form">
        {renderInput(emailInput)}
        {renderInput(passwordInput)}
        {renderBottom(loginBottom)}
      </form>
    </section>
  );
}
