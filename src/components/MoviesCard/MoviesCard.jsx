import React, { useEffect } from "react";
import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  movie,
  handleLikedMovie,
  handleDeleteMovie,
  checkIsLiked,
}) {
  let location = useLocation();
  const pathname = location.pathname;
  const [isLiked, setIsLiked] = useState(false);

  const isMovieSaved = checkIsLiked(movie);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    handleLikedMovie(movie);
  };

  const handleDeleteClick = () => {
    handleDeleteMovie(movie);
  }

  useEffect(() => {
    if (isMovieSaved) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isMovieSaved]);

  const cardLikeButtonClassName = `moviesCard__like-button ${
    isLiked ? "moviesCard__like-button_active" : ""
  }`;

  let movieDuration = movie.duration + " мин";
  if (movie.duration >= 60) {
    movieDuration =
      ((movie.duration / 60) | 0) + " ч " + (movie.duration % 60) + " мин";
  }

  return (
    <li className="moviesCard">
      <a href={movie.trailerLink} rel="noreferrer" target="_blank">
        <img
          className="moviesCard__image"
          src={movie.image}
          alt={movie.nameRU}
        />
      </a>
      <div className="moviesCard__section">
        <h2 className="moviesCard__title">{movie.nameRU}</h2>
        <button
          type="button"
          onClick={pathname === "/saved-movies" ? handleDeleteClick : handleLikeClick}
          aria-label="Кнопка: добавить в избранное"
          className={
            pathname === "/saved-movies"
              ? "moviesCard__delete-button"
              : cardLikeButtonClassName
          }
        ></button>
      </div>
      <p className="moviesCard__duration">{movieDuration}</p>
    </li>
  );
}
