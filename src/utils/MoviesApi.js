import {BEAT_FILM_URL} from "./constants";

class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // загрузка массива фильмов
  getInitialMovies() {
    return fetch(this.baseUrl, {
      headers: this.headers,
      method: "GET"
    })
        .then(this._checkResponse)
  }

}

const newMoviesApi = new MoviesApi({

  baseUrl: BEAT_FILM_URL + '/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default newMoviesApi
