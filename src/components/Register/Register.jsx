import React from "react";
import "./Register.css";
import headerLogo from "../../images/logo.svg";
import { renderTop, renderInput, renderBottom } from "../SimpleForm/SimpleForm";
import { useFormWithValidation } from "../../hooks/useForm";

export default function Register({ onRegister }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  const registerTop = {
    component: "register",
    headerLogo: headerLogo,
    title: "Добро пожаловать!",
  };

  const nameInput = {
    for: "name",
    component: "register",
    label: "Имя",
    id: "name",
    name: "name",
    type: "text",
    value: values.name,
    error: errors.name,
    handleChange: handleChange,
    pattern: "^[-A-Za-z ]+$|^[-А-Яа-яЁё ]+$",
    minLength: 2,
  };

  const emailInput = {
    for: "email",
    component: "register",
    label: "E-mail",
    id: "email",
    name: "email",
    type: "email",
    value: values.email,
    error: errors.email,
    handleChange: handleChange,
  };

  const passwordInput = {
    for: "password",
    component: "register",
    label: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    value: values.password,
    error: errors.password,
    handleChange: handleChange,
    minLength: 8,
  };

  const registerBottom = {
    component: "register",
    submitButton: "Зарегистрироваться",
    action: "login",
    actionTitle: "Уже зарегистрированы?",
    actionButton: "Войти",
    onClick: handleSubmit,
    disabled: !isValid,
  };

  return (
    <section className="register">
      {renderTop(registerTop)}
      <form className="register__form">
        {renderInput(nameInput)}
        {renderInput(emailInput)}
        {renderInput(passwordInput)}
        {renderBottom(registerBottom)}
      </form>
    </section>
  );
}
