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

  async getMovies() {
    const res = await fetch(this.url + "/beatfilm-movies", {
      headers: this.headers,
    });
    return this._checkResponse(res);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
