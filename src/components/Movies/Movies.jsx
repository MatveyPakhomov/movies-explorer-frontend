import React from "react";
import "./Movies.css";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMovies from "../SavedMovies/SavedMovies";
import moviesApi from "../../utils/MoviesApi";
// import { movieConfig } from "../../utils/utils";

export default function Movies() {
  const [filterCheckbox, setFilterCheckbox] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  function searchMovies(e) {
    e.preventDefault();
    moviesApi
      .getMoviesList()
      .then((movies) => {
        setMovies(
          movies.filter((movie) => {
            const movieTitle = movie.nameRU.toLowerCase();
            if (movieTitle.includes(e.target[0].value.toLowerCase())) {
              return movie;
            } else if (filterCheckbox && movie.duration < 40) {
              console.log(11, movie.duration)
              return movie
            } else return null;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleFilterCheckboxChange() {
    filterCheckbox ? setFilterCheckbox(false) : setFilterCheckbox(true);
  }

  return (
    <section className="movies">
      <SearchForm
        changeFilterCheckbox={handleFilterCheckboxChange}
        filterCheckbox={filterCheckbox}
        onSubmit={searchMovies}
      />
      {pathname === "/saved-movies" ? (
        <SavedMovies movies={movies} filterCheckbox={filterCheckbox} />
      ) : (
        <MoviesCardList movies={movies} filterCheckbox={filterCheckbox} />
      )}
    </section>
  );
}
