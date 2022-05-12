import React from "react";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../MoviesCardList/MoviesCardList";

export default function SavedMovies(onCardLike) {
  return (
    <section className="savedMovies">
      <ul className="savedMovies__list">
        {movies.map(({ key, ...options }) => {
          if(options.isLiked) {
            return (<MoviesCard onCardLike={onCardLike} key={key} {...options} />)
          } else return null;
        })}
      </ul>
    </section>
  );
}
