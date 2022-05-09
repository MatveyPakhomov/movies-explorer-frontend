import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(onCardLike, handlMoreMoviesClick) {
  return (
    <>
      <section className="moviesCardList">
        <ul className="moviesCardList__list">
          {movies.map(({ key, ...options }) => (
            <MoviesCard onCardLike={onCardLike} key={key} {...options} />
          ))}
        </ul>
      </section>
      <section className="moviesCardList__moreMovies-button-section">
        <button
          type="button"
          onClick={handlMoreMoviesClick}
          aria-label="Кнопка: загрузить еще фильмы"
          className="moviesCardList__moreMovies-button"
        >
          Ещё
        </button>
      </section>
    </>
  );
}

export const movies = [
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 1,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 2,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 3,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 4,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 5,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 6,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 7,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 8,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 2м",
    key: 9,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 10,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 11,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 12,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 13,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 2м",
    key: 14,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 15,
  },
  {
    url: "https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200+previewsm.png",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 16,
  },
];
