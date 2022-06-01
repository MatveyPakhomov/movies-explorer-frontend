import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({
  isLiked,
  handleClick,
  onCardLike,
  ...props
}) {
  const cardLikeButtonClassName = `moviesCard__like-button ${
    isLiked ? "moviesCard__like-button_active" : ""
  }`;

  function handleImageClick() {
    handleClick(props);
  }

  function handleLikeClick() {
    onCardLike(props);
  }
  return (
    <li className="moviesCard">
      <img
        className="moviesCard__image"
        onClick={handleImageClick}
        src={`https://api.nomoreparties.co${props.image.url}`}
        alt={props.nameRU}
      />
      <div className="moviesCard__section">
        <h2 className="moviesCard__title">{props.nameRU}</h2>
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
