import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  movies,
  filterCheckbox,
  handleCheckboxChange,
  isPreloaderOpen,
  isMoviesNotFound,
  setIsPreloaderOpen,
  setMovies,
  setIsMoviesNotFound,
  isRequestError,
  setIsRequestError,
}) {
  return (
    <section className="savedMovies">
      <SearchForm
        changeFilterCheckbox={handleCheckboxChange}
        filterCheckbox={filterCheckbox}
        setIsPreloaderOpen={setIsPreloaderOpen}
        setMovies={setMovies}
        setIsMoviesNotFound={setIsMoviesNotFound}
        setIsRequestError={setIsRequestError}
      />
      {isMoviesNotFound ? (
        <div className="savedMovies__section_notFound">Ничего не найдено :(</div>
      ) : (
        <Preloader isOpen={isPreloaderOpen} />
      )}
      <MoviesCardList
        movies={movies}
        filterCheckbox={filterCheckbox}
        isRequestError={isRequestError}
      />
    </section>
  );
}
