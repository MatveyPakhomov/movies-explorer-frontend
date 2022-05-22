import React from "react";
import "./SearchForm.css";
import searchImage from "../../images/search.svg";
// import moviesApi from "../../utils/MoviesApi";

export default function SearchForm({
  onSubmit,
  changeFilterCheckbox,
  filterCheckbox,
}) {
  // function handleChange(e) {
  //   // const { name, value } = e.target;
  //   // setState((prev) => ({
  //   //   ...prev,
  //   //   [name]: value,
  //   // }));
  // }

  // function onSubmit() {
  //   onSubmit
  // }

  return (
    <section className="searchForm">
      <form className="searchForm__form" onSubmit={onSubmit}>
        <div className="searchForm__section">
          <img
            className="searchForm__search-image"
            src={searchImage}
            alt="Картинка: Лупа в кружке"
          />
          <input
            className="searchForm__input"
            placeholder="Фильм"
            // onChange={handleChange}
            required
          />
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
