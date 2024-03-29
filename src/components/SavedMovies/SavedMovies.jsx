import React, { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

export default function SavedMovies({
  isMoviesNotFound,
  setIsMoviesNotFound,
  isRequestError,
  setIsRequestError,
  handleSearchRequest,
  handleSaveMovie,
  localMovies,
  filterCheckbox,
  filterShortMovies,
  handleDeleteMovie,
  handleLikedMovie,
  savedMovies,
  isPreloaderOpen,
  setIsPreloaderOpen,
  checkIsLiked,
  handleCheckboxChange,
  handleGetSavedMovies,
}) {
  let location = useLocation();
  const [textRequest, setTextRequest] = React.useState("");
  const [findedMovies, setFindedMovies] = React.useState([]);

  useEffect(() => {
    handleGetSavedMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleMoviesSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textRequest]);

  useEffect(() => {
    setFindedMovies(savedMovies);
  }, [savedMovies]);

  function handleMoviesSearch() {
    if (textRequest) {
      setFindedMovies(handleSearchRequest(savedMovies, textRequest));
      setTimeout(() => setIsPreloaderOpen(false), 1500);
    }
  }

  return (
    <section className="savedMovies">
      <SearchForm
        textRequest={textRequest}
        setTextRequest={setTextRequest}
        filterCheckbox={filterCheckbox}
        setIsPreloaderOpen={setIsPreloaderOpen}
        changeFilterCheckbox={handleCheckboxChange}
        setIsMoviesNotFound={setIsMoviesNotFound}
        setIsRequestError={setIsRequestError}
      />
      {isPreloaderOpen ? (
        <Preloader isOpen={isPreloaderOpen} />
      ) : (
        <MoviesCardList
          textRequest={textRequest}
          isPreloaderOpen={isPreloaderOpen}
          filterShortMovies={filterShortMovies}
          findedMovies={findedMovies}
          setFindedMovies={setFindedMovies}
          handleSearchRequest={handleSearchRequest}
          localMovies={localMovies}
          checkIsLiked={checkIsLiked}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          handleLikedMovie={handleLikedMovie}
          filterCheckbox={filterCheckbox}
          locationPathname={location.pathname}
          setIsMoviesNotFound={setIsMoviesNotFound}
        />
      )}
      {isMoviesNotFound && !isRequestError ? (
        <div className="savedMovies__section_notFound">
          Ничего не найдено :(
        </div>
      ) : null}
    </section>
  );
}
