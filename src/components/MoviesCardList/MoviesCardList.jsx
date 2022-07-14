import React, { useState, useEffect, useCallback } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  filterCheckbox,
  isRequestError,
  filterShortMovies,
  findedMovies,
  handleDeleteMovie,
  handleLikedMovie,
  checkIsLiked,
}) {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  const setTypeOfMovies = useCallback(() => {
    filterCheckbox
      ? setMovies(filterShortMovies(findedMovies))
      : setMovies(findedMovies);
  }, [filterShortMovies, findedMovies, filterCheckbox]);

  useEffect(() => {
    setTypeOfMovies();
  }, [setTypeOfMovies]);

  const [isDesktopScreen, setIsDesktopScreen] = useState(
    window.matchMedia("(min-width: 1280px)").matches
  );
  const [isTabletScreen, setIsTabletScreen] = useState(
    window.matchMedia("(min-width: 990px) and (max-width: 1279px)").matches
  );
  const [isSmallTabletScreen, setIsSmallTabletScreen] = useState(
    window.matchMedia("(min-width: 768px) and (max-width: 989px)").matches
  );
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [next, setNext] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(12);
  let arrayForHoldingMovies = [];

  useEffect(() => {
    window
      .matchMedia("(min-width: 1280px)")
      .addEventListener("change", (e) => setIsDesktopScreen(e.matches));
    window
      .matchMedia("(min-width: 990px) and (max-width: 1279px)")
      .addEventListener("change", (e) => setIsTabletScreen(e.matches));
    window
      .matchMedia("(min-width: 768px) and (max-width: 989px)")
      .addEventListener("change", (e) => setIsSmallTabletScreen(e.matches));
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) => setIsMobileScreen(e.matches));
    return () => {
      window
        .matchMedia("(min-width: 1280px)")
        .removeEventListener("change", (e) => setIsDesktopScreen(e.matches));
      window
        .matchMedia("(min-width: 990px) and (max-width: 1279px)")
        .removeEventListener("change", (e) => setIsTabletScreen(e.matches));
      window
        .matchMedia("(min-width: 768px) and (max-width: 989px)")
        .removeEventListener("change", (e) =>
          setIsSmallTabletScreen(e.matches)
        );
      window
        .matchMedia("(max-width: 767px)")
        .removeEventListener("change", (e) => setIsMobileScreen(e.matches));
    };
  }, []);

  useEffect(() => {
    if (isDesktopScreen) {
      setMoviesPerPage(12);
      setNext(4);
    }
    if (isTabletScreen) {
      setMoviesPerPage(12);
      setNext(3);
    }
    if (isSmallTabletScreen) {
      setMoviesPerPage(8);
      setNext(2);
    }
    if (isMobileScreen) {
      setMoviesPerPage(5);
      setNext(2);
    }
  }, [isDesktopScreen, isTabletScreen, isSmallTabletScreen, isMobileScreen]);

  function renderMoreButton() {
    return (
      <section className="moviesCardList__moreMovies-button-section">
        <button
          type="button"
          onClick={handleShowMorePosts}
          aria-label="Кнопка: загрузить еще фильмы"
          className="moviesCardList__moreMovies-button"
        >
          Ещё
        </button>
      </section>
    );
  }

  function renderMovies() {
    if (moviesToShow.length) {
      return moviesToShow.map((movie) => (
        <MoviesCard
          key={movie.movieId}
          movie={movie}
          handleDeleteMovie={handleDeleteMovie}
          handleLikedMovie={handleLikedMovie}
          checkIsLiked={checkIsLiked}
        />
      ));
    } else return null;
  }

  const loopWithSlice = (start, end) => {
    const slicedMovies = movies.slice(start, end);
    if (moviesToShow[1] === slicedMovies[1] || moviesToShow[1] !== movies[1]) {
      arrayForHoldingMovies = [...slicedMovies];
    } else arrayForHoldingMovies = [...moviesToShow, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies);
  };

  useEffect(() => {
    loopWithSlice(0, moviesPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  const handleShowMorePosts = () => {
    loopWithSlice(moviesToShow.length, moviesToShow.length + next);
  };

  return (
    <>
      <section className="moviesCardList">
        {isRequestError ? (
          <div className="moviesCardList__section_error">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </div>
        ) : (
          <ul className="moviesCardList__list">{renderMovies()}</ul>
        )}
      </section>
      {moviesToShow.length &&
      moviesToShow[moviesToShow.length - 1] !== movies[movies.length - 1] &&
      pathname !== "saved-movies" &&
      !isRequestError
        ? renderMoreButton()
        : null}
    </>
  );
}

// export const defaultMovies = [
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 42м",
//     key: 1,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 2,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 42м",
//     key: 3,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 4,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 42м",
//     key: 5,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 6,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 42м",
//     key: 7,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 8,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 2м",
//     key: 9,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 10,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 42м",
//     key: 11,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 12,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 13,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 2м",
//     key: 14,
//   },
//   {
//     url: "https://external-preview.redd.it/jPy0m52jpUMZNMseez1ASs2V-O94N_zX4LD8HLggd-U.jpg?width=640&crop=smart&auto=webp&s=05435e533aa66e370ee43f24390f693998c4d6a8",
//     title: "33 слова о дизайне",
//     isLiked: false,
//     duration: "1ч 42м",
//     key: 15,
//   },
//   {
//     url: "https://cdn.pastemagazine.com/www/articles/2019/06/07/black-mirror-season-5-logo-main/black-mirror-season-5-logo-main.jpg",
//     title: "33 слова о дизайне",
//     isLiked: true,
//     duration: "1ч 42м",
//     key: 16,
//   },
// ];
