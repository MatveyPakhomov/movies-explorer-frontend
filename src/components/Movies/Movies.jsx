import React from "react";
import "./Movies.css";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Preloader from "../Preloader/Preloader";

export default function Movies({
  movies,
  searchMovies,
  filterCheckbox,
  handleCheckboxChange,
  isPreloaderOpen,
  setRequestMovie,
  requestMovie,
  isMoviesNotFound,
  setIsPreloaderOpen,
  setMovies,
}) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section className="movies">
      <SearchForm
        changeFilterCheckbox={handleCheckboxChange}
        filterCheckbox={filterCheckbox}
        onSubmit={searchMovies}
        setRequestMovie={setRequestMovie}
        requestMovie={requestMovie}
        movies={movies}
        setIsPreloaderOpen={setIsPreloaderOpen}
        setMovies={setMovies}
      />
      <Preloader isOpen={isPreloaderOpen}/>
      {pathname === "/saved-movies" ? (
        <SavedMovies movies={movies} filterCheckbox={filterCheckbox} />
      ) : (
        <MoviesCardList movies={movies} filterCheckbox={filterCheckbox} isMoviesNotFound={isMoviesNotFound} />
      )}
    </section>
  );
}
