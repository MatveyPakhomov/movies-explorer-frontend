import React from "react";
import "./SearchForm.css";
import searchImage from "../../images/search.svg";
import { useFormWithValidation } from "../../hooks/useForm";
import moviesApi from "../../utils/MoviesApi";

export default function SearchForm({
  changeFilterCheckbox,
  filterCheckbox,
  setRequestMovie,
  requestMovie,
  movies,
  setIsPreloaderOpen,
  setMovies,
}) {
  const { values, handleChange, handleSubmit, errors, resetForm, isValid } =
    useFormWithValidation();

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
    if (isValid) {
      setIsPreloaderOpen(true);
      moviesApi
        .getMoviesList()
        .then((moviesData) => {
          setMovies(
            moviesData.filter((movie) => {
              const movieTitle = movie.nameRU.toLowerCase();
              if (movieTitle.includes(e.target[0].value.toLowerCase())) {
                return movie;
              } else return null;
            })
          );
          resetForm({}, {}, false);
        })
        .then(() => {
          localStorage.setItem(
            "searchMovie",
            JSON.stringify({
              requestMovie: requestMovie,
              moives: movies,
              filterCheckbox: filterCheckbox,
            })
          );
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsPreloaderOpen(false);
        });
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
              placeholder="Фильм"
              value={values.name || ""}
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
