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

export const regex = {
  name: "^[-A-Za-z ]+$|^[-А-Яа-яЁё ]+$",
  // eslint-disable-next-line no-useless-escape
  email: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,4}$",
  // eslint-disable-next-line no-useless-escape
  url: "/https?://(www.)?[w-.~:/?#[]@!$&'()*+,;=]{1,256}.[w-.~:/?#[]@!$&'()*+,;=]{1,6}/i",
};

export const messages = [
  { name: "registerSuccess", value: "Вы успешно зарегистрировались." },
  { name: "errorMessage", value: "Что-то пошло не так. Попробуйте ещё раз." },
  { name: "userEditSuccess", value: "Данные изменены." },
];
