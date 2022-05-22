import React from "react";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function SavedMovies(movies, onCardLike) {
  return (
    <section className="savedMovies">
      <ul className="savedMovies__list">
        {movies.length
          ? movies.map(({ key, ...options }) => {
              if (options.isLiked) {
                return (
                  <MoviesCard onCardLike={onCardLike} key={key} {...options} />
                );
              } else return null;
            })
          : ""}
      </ul>
    </section>
  );
}
