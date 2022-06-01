class MoviesApi {
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

  async getMoviesList() {
    const res = await fetch(this.url + "/beatfilm-movies", {
      // credentials: "include", -- надо работаться, нужен ли этот параметр
      headers: this.headers,
    });
    return this._checkResponse(res);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    // Authorization: `Bearer ${document.cookie.slice(4)}`,
    "Content-Type": "application/json",
  },
});

export default moviesApi;
