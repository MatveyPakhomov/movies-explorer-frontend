import React from "react";
import "./Register.css";
import headerLogo from "../../images/logo.svg";
import { renderTop, renderInput, renderBottom } from "../SimpleForm/SimpleForm";
import { useForm } from "../../hooks/useForm";

export default function Register(onRegister) {
  const { values, handleChange } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  const registerTop = {
    component: "register",
    headerLogo: headerLogo,
    title: "Добро пожаловать!",
  };

  const emailInput = {
    for: "email",
    component: "register",
    label: "E-mail",
    id: "email",
    name: "email",
    type: "email",
    value: values.email,
    handleChange: handleChange,
  };

  const nameInput = {
    for: "name",
    component: "register",
    label: "Имя",
    id: "name",
    name: "name",
    type: "text",
    value: values.name,
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
    handleChange: handleChange,
  };

  const registerBottom = {
    component: "register",
    submitButton: "Зарегистрироваться",
    action: "login",
    actionTitle: "Уже зарегистрированы?",
    actionButton: "Войти",
    onClick: handleSubmit,
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
