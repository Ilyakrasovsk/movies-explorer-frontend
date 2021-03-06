import {BEAT_FILM_URL} from "./constants";

class MainApi {
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


  getProfileInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
    .then(this._checkResponse)
  }


  editProfileInfo(name, email) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(this._checkResponse)
  }

  setToken() {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }

  addNewMovie(movie) {
    return fetch(this.baseUrl + '/movies', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country ? movie.country : ' ',
        director: movie.director ? movie.director : ' ',
        duration: movie.duration ? movie.duration : ' ',
        year: movie.year ? movie.year : ' ',
        description: movie.description ? movie.description : ' ',
        image: movie.image?.url ? BEAT_FILM_URL + movie.image.url : ' ',
        trailerLink: movie.trailerLink ? movie.trailerLink : ' ',
        thumbnail: movie.image?.formats?.thumbnail?.url ? BEAT_FILM_URL + movie.image.formats.thumbnail.url : ' ',
        nameRU: movie.nameRU ? movie.nameRU : ' ',
        nameEN: movie.nameEN ? movie.nameEN : ' ',
        movieId: movie.id,
      })
    })
        .then(this._checkResponse)
  }

  getMovies() {
    return fetch(this.baseUrl + '/movies', {
      method: 'GET',
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  deleteMovie(movieId) {
    return fetch(this.baseUrl + `/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkResponse)

  }
}

const newMainApi = new MainApi({
  baseUrl: "http://api.diplom.ilkras.nomoredomains.work",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  }
})

export default newMainApi
