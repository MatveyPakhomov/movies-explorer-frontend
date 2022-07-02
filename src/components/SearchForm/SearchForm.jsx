import React, { useEffect } from "react";
import "./SearchForm.css";
import searchImage from "../../images/search.svg";
import { useFormWithValidation } from "../../hooks/useForm";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  changeFilterCheckbox,
  setIsMoviesNotFound,
  setIsRequestError,
  setTextRequest,
  filterCheckbox,
  setIsPreloaderOpen,
}) {
  const lastRequest = localStorage.getItem("lastRequest");
  const { values, handleChange, handleSubmit, errors, resetForm, isValid } =
    useFormWithValidation();
  const searchValue = values?.name;
  const location = useLocation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
    if (isValid) {
      setTextRequest(searchValue);
      setIsRequestError(false);
      setIsMoviesNotFound(false);
      setIsPreloaderOpen(true);
    }
  }

  return (
    <section className="searchForm">
      <form className="searchForm__form" onSubmit={handleFormSubmit} noValidate>
        <div className="searchForm__section">
          <img
            className="searchForm__search-image"
            src={searchImage}
            alt="Картинка: Лупа в кружке"
          />
          <section className="searchForm__input-section">
            <input
              type="text"
              name="name"
              className="searchForm__input"
              placeholder={
                location.pathname === "/movies"
                  ? lastRequest || "Фильм"
                  : "Фильм"
              }
              value={searchValue || ""}
              onChange={handleChange}
              required
            />
            <span className="searchForm__input-error">{errors.name || ""}</span>
          </section>
          <button type="submit" className="searchForm__submit-button">
            Найти
          </button>
        </div>
      </form>
      <div className="searchForm__slider-section">
        <button
          type="button"
          className={
            filterCheckbox
              ? "searchForm__slider-button_active"
              : "searchForm__slider-button"
          }
          onClick={changeFilterCheckbox}
        ></button>
        <p className="searchForm__slider-title">Короткометражки</p>
      </div>
    </section>
  );
}
