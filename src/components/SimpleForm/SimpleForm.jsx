import React from "react";
import "./SimpleForm.css";
import "../Header/Header.css";
import { Link } from "react-router-dom";

function renderTop(props) {
  return (
    <div className={`${props.component}__top-section top__section`}>
      <Link to={"/"} className={`${props.component}__link top__link"`}>
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
        value={props.value || ""}
        className={`${props.component}__input input`}
        onChange={props.handleChange}
        pattern={props.pattern}
        minLength={props.minLength}
        maxLength={props.maxLength || 200}
      />
      <span
        id={`${props.component}-name-error`}
        className={`${props.component}__input_error input__error-label`}
      >
        {props.error || ""}
      </span>
    </section>
  );
}

function renderBottom(props) {
  return (
    <div className={`${props.component}__bottom-section bottom__container`}>
      <button
        type="submit"
        className={`${props.component}__submit-button bottom__submit-button`}
        onClick={props.onClick}
        disabled={props.disabled || false}
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

export { renderTop, renderInput, renderBottom };
