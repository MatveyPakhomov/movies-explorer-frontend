import React from "react";
import "./Movies.css";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMovies from "../SavedMovies/SavedMovies";

export default function Movies() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <section className="movies">
      <SearchForm />
      {pathname === "/saved-movies" ? <SavedMovies /> : <MoviesCardList />}
    </section>
  );
}
