import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import React from "react";
import Main from "./Main";
import Movies from './Movies/Movies';
import Saved from './Saved/Saved';
import '../index.css';
import Login from "./Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile.js";
import Error from "./Error/Error";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as Auth from "../utils/Auth";
import newMainApi from "../utils/MainApi";
import newMoviesApi from "../utils/MoviesApi";
import useFormWithValidation from "../hooks/useValidation";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: ''});
  const [editProfileStatus, setEditProfileStatus] = React.useState(false);
  const [isStatusOk, setStatusOk] = React.useState(false);
  const {pathname} = useLocation();

  const [data, setData] = React.useState({
    email: '',
    password: ''
  });
  const MainRoute = '/';
  const isRegisterRoute = '/signup' == pathname;
  const isLoginRoute = '/signin' == pathname;
  const ProfileRoute = '/profile';
  const MovieRoute = '/movies';
  const SaveMovieRoute = '/saved';

  const [moviesFromApi, setMoviesFromApi] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isPreloaderOn, setPreloaderOn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [clickCounter, changeClickCounter] = React.useState(1);
  const [isActive, setIsActive] = React.useState({
   tumbler: false
  });
  const [showMore, setShowMore] = React.useState(true);
  const [countMoviesSearch, setCountMoviesSearch] = React.useState(false);
  const [countMoviesSavedSearch, setCountMoviesSavedSearch] = React.useState(false);

  function countClick() {
    changeClickCounter(clickCounter+1)
  }
  React.useEffect(() => {
    if (movies.length === searchedMovies.length) {
      setShowMore(false)
    } else {
      setShowMore(true)
    }
  })

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
      if (localStorage.getItem("movies")) {
        setSearchedMovies(JSON.parse(localStorage.getItem("movies")))
      }
    }
    tokenCheck();
  }, [history, loggedIn])

  React.useEffect(() => {

  }, [history, loggedIn])

  const tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      Auth.getContent(jwt)
        .then(({_id, email, name}) => {
          if (email) {
            setLoggedIn(true);
            setCurrentUser({_id, email, name})
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }

  function handleRegistration({name, email, password}) {
    Auth.registration({name, email, password})
      .then(() => {
        setStatusOk(true);
        localStorage.setItem('profile', name)
        handleAuthorization({email, password})
      })
      .catch((err) => {
        setStatusOk(false);
        console.log('error', err)
      })
  }

  function handleAuthorization({email, password}) {
    Auth.authorization({email, password})
      .then((data) => {
        console.log(data.token, email, password)
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('profile', currentUser.name);
        history.push('/movies')
        newMainApi.setToken();
        setLoggedIn(true);
        setStatusOk(true);
      })
      .catch((err) => {
        setStatusOk(false);
        console.log('error', err)
      })
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setData({
      email: '',
      password: ''
    });
    setLoggedIn(false);
    history.push('/');
  }

  function handleUpdateUser(user) {
    newMainApi.editProfileInfo(user.name, user.email)
      .then((data) => {
        setCurrentUser(data);
        localStorage.setItem('profile', data.user.name)
        setEditProfileStatus(true);
      })
      .catch((err) => {
        setEditProfileStatus(false);
        console.log('error', err)
      })
  }

  React.useEffect(() => {
    newMoviesApi.getInitialMovies()
      .then((data) => {
        setMoviesFromApi(data)
        localStorage.setItem('movies', JSON.stringify(data));
      })
      .catch((err) => {
        console.log('error', err)
      })
    getSaveMovies();
  }, [history, loggedIn])

  function preloaderOn() {
    setPreloaderOn(true)
  }
  function preloaderOff() {
    setPreloaderOn(false)
  }

  function handleSearchForm(e) {
    preloaderOn();
    e.preventDefault();
    const value = e. target.querySelector('.search__input').value
    const a = moviesFromApi.filter((movie) => {
      if(isActive.tumbler == true){
        return movie.nameRU?.includes(value)&& movie.duration <= 40 || movie.nameEN?.includes(value) && movie.duration <= 40
      } else if(isActive.tumbler == false){
            return movie.nameRU?.includes(value) || movie.nameEN?.includes(value)
          }
    })
    preloaderOff();
    if (a.length <= 0) {
      setCountMoviesSearch(true)
    } else {
      setCountMoviesSearch(false)
    }
    setSearchedMovies(a);
    changeClickCounter(1);
    localStorage.setItem('movies', JSON.stringify(a))
  }

  function handleSearchSaveMoviesForm(e) {
    e.preventDefault();
    preloaderOn();
    const value = e.target.querySelector('.search__input').value
    const film =  savedMovies.filter((movie) => {
      if(isActive.tumbler == true){
        return movie.nameRU?.includes(value)&& movie.duration <= 40 || movie.nameEN?.includes(value) && movie.duration <= 40
      } else if(isActive.tumbler == false){
            return movie.nameRU?.includes(value) || movie.nameEN?.includes(value)
          }
    })
    if(film.length <= 0){
      setCountMoviesSavedSearch(true)
    } else {
        setCountMoviesSavedSearch(false)
      }
    preloaderOff();
    console.log(film);
    setSearchedMovies(film);
    changeClickCounter(1);
    localStorage.setItem('saved', JSON.stringify(film))
  }

  function isLiked(movieId) {
    for (const movie of Object.keys(savedMovies)) {
      if (movie.movieId === movieId) {
        return true
      }
    }
    return false
  }

  function handleMovieLike(movie) {
    newMainApi.addNewMovie(movie)
      .then((m) => {
        setSavedMovies([...savedMovies, m]);
        localStorage.setItem('saved', JSON.stringify([...savedMovies, m]))
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  function getSaveMovies() {
    return newMainApi.getMovies()
    .then((movies) => {
      return movies
    })
    .then((movies) => {
      setSavedMovies(movies.data);
    })
    .catch((err) => {
      console.log('error', err)
    })
  }

  function handleMovieDislike(movieId) {
    newMainApi.deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = JSON.parse(localStorage.getItem('saved'))
          .filter((item) => {
            console.log(item._id, movieId)
            return item._id !== movieId
          })
        localStorage.setItem('saved', JSON.stringify(newSavedMovies))
        setSavedMovies(newSavedMovies)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  function handleChange(e) {
    let {name, value} = e.target;
    if (name === "tumbler") {
      value = !!e.target.checked
    }
    setIsActive({
      ...isActive,
      [name]: value
    })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>

        <ProtectedRoute path="/movies"
          loggedIn={loggedIn}
          isPreloaderOn={isPreloaderOn}
          onSearch={handleSearchForm}
          component={Movies}
          savedMovies={savedMovies}
          isActive={isActive}
          handleChange={handleChange}
          counterMoviesSearch={countMoviesSearch}
          movies={moviesFromApi}
          saveMovie={handleMovieLike}
          deleteMovie={handleMovieDislike}
          countClick={countClick}
          isShowMore={showMore}
        />
        <ProtectedRoute path="/saved"
          loggedIn={loggedIn}
          isPreloaderOn={isPreloaderOn}
          onSearch={handleSearchSaveMoviesForm}
          component={Saved}
          savedMovies={savedMovies}
          isActive={isActive}
          handleChange={handleChange}
          counterMoviesSearch={countMoviesSavedSearch}
          movies={moviesFromApi}
          saveMovie={handleMovieLike}
          deleteMovie={handleMovieDislike}
          countClick={countClick}
          isShowMore={showMore}
        />
        <ProtectedRoute path="/profile"
          loggedIn={loggedIn}
          onLogOut={handleLogOut}
          user={currentUser}
          onUpdateUser={handleUpdateUser}
          component={Profile}
        />
        <Route path="/signin">
          <Login
            data={data}
            onEnter={setData}
            onAutorization={handleAuthorization}
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={handleRegistration}
            isValidate={useFormWithValidation}
          />
        </Route>
        <Route render={Error}>
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}
export default App;
