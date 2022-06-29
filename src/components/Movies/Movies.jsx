import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies({
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
    <section className="movies">
      <SearchForm
        changeFilterCheckbox={handleCheckboxChange}
        filterCheckbox={filterCheckbox}
        setIsPreloaderOpen={setIsPreloaderOpen}
        setMovies={setMovies}
        setIsMoviesNotFound={setIsMoviesNotFound}
        setIsRequestError={setIsRequestError}
      />
      {isMoviesNotFound ? (
        <div className="movies__section_notFound">Ничего не найдено :(</div>
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
