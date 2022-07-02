import React, { useCallback, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

export default function Movies({
  handleCheckboxChange,
  isMoviesNotFound,
  setIsMoviesNotFound,
  isRequestError,
  setIsRequestError,
  handleSearchRequest,
  handleSaveMovie,
  localMovies,
  filterCheckbox,
  setFilterCheckbox,
  filterShortMovies,
  handleDeleteMovie,
  handleLikedMovie,
  savedMovies,
  isPreloaderOpen,
  setIsPreloaderOpen,
  checkIsLiked,
}) {
  let location = useLocation();
  const [textRequest, setTextRequest] = React.useState("");
  const [isFirstRequest, setIsFirstRequest] = React.useState(true);
  const [findedMovies, setFindedMovies] = React.useState([]);

  const handleMoviesSearch = useCallback(() => {
    if (textRequest.length > 0) {
      setFindedMovies(handleSearchRequest(localMovies, textRequest));
      setIsFirstRequest(false);
      localStorage.setItem("lastRequest", textRequest);
    }

    setTimeout(() => setIsPreloaderOpen(false), 1500);
  }, [localMovies, handleSearchRequest, textRequest, setIsPreloaderOpen]);

  useEffect(() => {
    handleMoviesSearch();
  }, [handleMoviesSearch]);

  const getFilterCheckboxStatus = useCallback(() => {
    const lastFilterCheckboxStatus = localStorage.getItem("checkboxStatus");
    if (lastFilterCheckboxStatus === "true") {
      return true;
    } else {
      return false;
    }
  }, []);

  const showMoviesFromLastRequest = useCallback(() => {
    const lastRequest = localStorage.getItem("lastRequest");
    if (lastRequest && isFirstRequest) {
      const longMovies = handleSearchRequest(localMovies, lastRequest);
      const shortMovies = filterShortMovies(longMovies);
      if (getFilterCheckboxStatus()) {
        setFindedMovies(shortMovies);
        setFilterCheckbox(true);
      } else {
        setFindedMovies(longMovies);
        setFilterCheckbox(false);
      }
    }
  }, [
    localMovies,
    getFilterCheckboxStatus,
    handleSearchRequest,
    isFirstRequest,
    setFilterCheckbox,
    filterShortMovies,
  ]);

  useEffect(() => {
    showMoviesFromLastRequest();
  }, [showMoviesFromLastRequest]);

  return (
    <section className="movies">
      <SearchForm
        changeFilterCheckbox={handleCheckboxChange}
        setIsMoviesNotFound={setIsMoviesNotFound}
        setIsRequestError={setIsRequestError}
        setTextRequest={setTextRequest}
        filterCheckbox={filterCheckbox}
        setFilterCheckbox={setFilterCheckbox}
        setIsPreloaderOpen={setIsPreloaderOpen}
      />
      {isMoviesNotFound ? (
        <div className="movies__section_notFound">Ничего не найдено :(</div>
      ) : (
        <Preloader isOpen={isPreloaderOpen} />
      )}
      <MoviesCardList
        filterCheckbox={filterCheckbox}
        isRequestError={isRequestError}
        filterShortMovies={filterShortMovies}
        findedMovies={findedMovies}
        savedMovies={savedMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        handleLikedMovie={handleLikedMovie}
        locationPathname={location.pathname}
        checkIsLiked={checkIsLiked}
        setIsMoviesNotFound={setIsMoviesNotFound}
      />
    </section>
  );
}
