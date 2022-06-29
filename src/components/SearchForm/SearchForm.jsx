import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import searchImage from "../../images/search.svg";
import { useFormWithValidation } from "../../hooks/useForm";
import moviesApi from "../../utils/MoviesApi";

export default function SearchForm({
  changeFilterCheckbox,
  filterCheckbox,
  setIsPreloaderOpen,
  setMovies,
  setIsMoviesNotFound,
  setIsRequestError,
}) {
  const localStorageRequest = JSON.parse(
    localStorage.getItem("searchMovie")
  ).requestMovie;
  const { values, handleChange, handleSubmit, errors, isValid } =
    useFormWithValidation();
  const [inputValue, setInputValue] = useState(localStorageRequest);

  useEffect(() => {
    if (values.name !== undefined) {
      setInputValue(values.name);
    }
  }, [values]);

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
    console.log(isValid);
    if (isValid || inputValue === localStorageRequest) {
      setIsRequestError(false);
      setIsMoviesNotFound(false);
      setIsPreloaderOpen(true);
      moviesApi
        .getMoviesList()
        .then((moviesData) => {
          const filteredMovies = moviesData.filter((movie) => {
            const movieTitle = movie.nameRU.toLowerCase();
            if (movieTitle.includes(e.target[0].value.toLowerCase())) {
              return movie;
            } else return null;
          });
          if (!filteredMovies.length) {
            setIsMoviesNotFound(true);
          }
          setMovies(filteredMovies);
          return filteredMovies;
        })
        .then((filteredMovies) => {
          localStorage.setItem(
            "searchMovie",
            JSON.stringify({
              requestMovie: values.name,
              movies: filteredMovies,
              filterCheckbox: filterCheckbox,
            })
          );
        })
        .catch((err) => {
          setIsRequestError(true);
          console.log(err);
        })
        .finally(() => {
          setIsPreloaderOpen(false);
        });
    }
  }
  console.log(inputValue);
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
              value={inputValue || ""}
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
