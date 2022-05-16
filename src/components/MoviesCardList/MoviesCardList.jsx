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
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 1,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 2,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 3,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 4,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 5,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 6,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 7,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 8,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 2м",
    key: 9,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 10,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 11,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 12,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 13,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 2м",
    key: 14,
  },
  {
    url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
    title: "33 слова о дизайне",
    isLiked: false,
    duration: "1ч 42м",
    key: 15,
  },
  {
    url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
    title: "33 слова о дизайне",
    isLiked: true,
    duration: "1ч 42м",
    key: 16,
  },
];
