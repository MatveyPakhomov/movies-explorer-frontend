import { movieConfig } from "./utils";

class MainApi {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(name, email) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify(name, email),
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(this.url + "/movies", {
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  setSavedMovie(movie) {
    return fetch(this.url + "/movies", {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(movieConfig(movie)),
    }).then(this._checkResponse);
  }

  deleteMovie(movie) {
    return fetch(this.url + `/movies/${movie._id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.pakhomov.diploma.nomoredomains.work"
      : "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${document.cookie.slice(4)}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
