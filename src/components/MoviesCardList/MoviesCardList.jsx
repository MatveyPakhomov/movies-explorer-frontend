import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, onCardLike, isRequestError }) {
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
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(4);
  const [postsPerPage, setPostPerPage] = useState(12);
  let arrayForHoldingPosts = [];

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
      setPostPerPage(12);
      setNext(4);
    }
    if (isTabletScreen) {
      setPostPerPage(12);
      setNext(3);
    }
    if (isSmallTabletScreen) {
      setPostPerPage(8);
      setNext(2);
    }
    if (isMobileScreen) {
      setPostPerPage(5);
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
    if (postsToShow.length) {
      return postsToShow.map((options) => (
        <MoviesCard onCardLike={onCardLike} key={options.id} {...options} />
      ));
    } else return null;
  }

  const loopWithSlice = (start, end) => {
    const slicedPosts = movies.slice(start, end);
    if (movies[1] !== postsToShow[1]) {
      arrayForHoldingPosts = [...slicedPosts];
    } else arrayForHoldingPosts = [...postsToShow, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
  };

  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, [movies]);

  const handleShowMorePosts = () => {
    loopWithSlice(postsToShow.length, postsToShow.length + next);
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
      {postsToShow.length &&
      postsToShow[postsToShow.length - 1] !== movies[movies.length - 1]
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
