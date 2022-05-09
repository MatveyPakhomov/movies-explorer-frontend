import React from "react";
import "./MoviesCard.css";

export default function MoviesCard(props) {
  const cardLikeButtonClassName = `moviesCard__like-button ${
    props.isLiked ? "moviesCard__like-button_active" : ""
  }`;

  function handleClick() {
    props.handleClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  return (
    <li className="moviesCard">
      <img
        className="moviesCard__image"
        onClick={handleClick}
        src={props.url}
        alt={props.alt}
      />
      <div className="moviesCard__section">
        <h2 className="moviesCard__title">{props.title}</h2>
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label="Кнопка: добавить в избранное"
          className={cardLikeButtonClassName}
        ></button>
      </div>
      <p className="moviesCard__duration">{props.duration}</p>
    </li>
  );
}
