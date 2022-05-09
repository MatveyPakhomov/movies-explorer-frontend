import React from "react";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import movies from "../MoviesCardList/MoviesCardList";

export default function SavedMovies(onCardLike) {
  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
        {movies.map(({ key, isLiked, ...options }) => (
          <MoviesCard onCardLike={onCardLike} key={key} {...options} />
        ))}
      </ul>
    </section>
  );
}
