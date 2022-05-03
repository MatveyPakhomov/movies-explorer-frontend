import React from "react";
import "./MoviesCardList.css";
// import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(
  movies,
  onCardClick,
  onCardLike,
  onCardDelete,
) {
  return (
    <div className="cards">
      <ul className="cards__list">
        {/* {movies.map(({ key, ...options }) => (
          <MoviesCard
            handleClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={key}
            {...options}
          />
        ))} */}
      </ul>
    </div>
  );
}
