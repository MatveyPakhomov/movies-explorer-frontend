const url = "https://api.nomoreparties.co";
export function movieConfig(movie) {
  return {
    country: movie.country || "Не указана",
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: movie.image?.value ? movie.image : url + movie.image.url,
    trailerLink: movie.trailerLink,
    thumbnail: movie.thumbnail
      ? movie.thumbnail
      : url + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
}
