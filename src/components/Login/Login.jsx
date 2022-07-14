import React from "react";
import "./Login.css";
import "../Register/Register.css";
import headerLogo from "../../images/logo.svg";
import { renderTop, renderInput, renderBottom } from "../SimpleForm/SimpleForm";
import { useFormWithValidation } from "../../hooks/useForm";
import { regex } from "../../utils/utils";

export default function Login({ onLogin }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

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
    error: errors.email,
    handleChange: handleChange,
    pattern: regex.email,
  };

  const passwordInput = {
    for: "password",
    component: "login",
    label: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    value: values.password,
    error: errors.password,
    handleChange: handleChange,
    minLength: 8,
  };

  const loginBottom = {
    component: "login",
    submitButton: "Войти",
    action: "register",
    actionTitle: "Ещё не зарегистрированы?",
    actionButton: "Регистрация",
    onClick: handleSubmit,
    disabled: !isValid,
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
