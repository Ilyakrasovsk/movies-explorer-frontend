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
import {SHORT_FILM_DURATION} from "../utils/constants";
import useFormWithValidation from "../hooks/useValidation";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('jwt')?true:false);
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: ''});
    const [editProfileStatus, setEditProfileStatus] = React.useState(false);
    const [isStatusOk, setStatusOk] = React.useState(false);
    const {pathname} = useLocation();

    // core static
    const [moviesFromApi, setMoviesFromApi] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    // core dynamic
    const [renderMovies, setRenderMovies] = React.useState( localStorage.getItem('movies-search-results') ? JSON.parse(localStorage.getItem('movies-search-results')) : []);
    const [renderMoviesSaved, setRenderMoviesSaved] = React.useState(savedMovies);
    // search dynamic
    const [moviesSearchState, setMoviesSearchState] = React.useState( localStorage.getItem('movies-search-state') ? JSON.parse(localStorage.getItem('movies-search-state')) : {
        'query': '',
        'short': false
    });
    const [savedMoviesSearchState, setSavedMoviesSearchState] = React.useState({
        'query': '',
        'short': false
    });

    const [isPreloaderOn, setPreloaderOn] = React.useState(false);
    const [clickCounter, changeClickCounter] = React.useState(1);
    const [showMore, setShowMore] = React.useState(true);

    const tokenCheck = () => {
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

    function preloaderOn() {
        setPreloaderOn(true)
    }
    function preloaderOff() {
        setPreloaderOn(false)
    }
    function countClick() {
        changeClickCounter(clickCounter+1)
    }

    // loaders

    function getSavedMovies() {
        return newMainApi.getMovies()
        .then((movies) => {
            return movies
        })
        .then((movies) => {
            setSavedMovies(movies.data);
            setRenderMoviesSaved(movies.data);
        })
        .catch((err) => {
            console.log('error', err)
        })
    }
    // auth

    function handleRegistration({name, email, password}) {
        Auth.registration({name, email, password})
            .then(() => {
                setStatusOk(true);
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
                localStorage.setItem('jwt', data.token);
                newMainApi.setToken();
                setLoggedIn(true);
                setStatusOk(true);
                history.push('/movies')
            })
            .catch((err) => {
                setStatusOk(false);
                console.log('error', err)
            })
    }

    function handleLogOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        // localStorage.removeItem('saved');
        // localStorage.removeItem('movies');
        // localStorage.removeItem('movies-search-results');
        // localStorage.removeItem('movies-search-state');
        setSavedMovies([])
        setRenderMovies([])
        setRenderMoviesSaved([])
        setMoviesSearchState({
            'query': '',
            'short': false
        })
        setSavedMoviesSearchState({
            'query': '',
            'short': false
        })
        history.push('/');
    }

    // profile

    function handleUpdateUser(user) {
        newMainApi.editProfileInfo(user.name, user.email)
            .then((data) => {
                setCurrentUser(data.user)
                setEditProfileStatus(true);
            })
            .catch((err) => {
                setEditProfileStatus(false);
                console.log('error', err)
            })
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
                setRenderMoviesSaved([...savedMovies, m]);
            })
            .catch((err) => {
                console.log('error', err)
            })
    }

    function handleMovieDislike(movieId) {
        newMainApi.deleteMovie(movieId)
            .then(() => {
                const newSavedMovies = savedMovies
                    .filter((item) => {
                        return item._id !== movieId
                    })
                setSavedMovies(newSavedMovies)
                setRenderMoviesSaved(newSavedMovies);
            })
            .catch((err) => {
                console.log('error', err)
            })
    }

    function toggleShortBaseSearch(e)
    {
        let state = {
            'query': moviesSearchState.query,
            'short': !!e.target.checked
        };
        setMoviesSearchState(state);
    }

    function toggleShortSavedSearch(e)
    {
        setSavedMoviesSearchState({
            'query': savedMoviesSearchState.query,
            'short': !!e.target.checked
        });
        // doSearchSavedMovies();
    }


    function handleSearchForm(e) {
        e.preventDefault();

        const value = e. target.querySelector('[name="search"]').value.toLowerCase()
        let state = {
            'query': value,
            'short': moviesSearchState.short
        };
        setRenderMovies([]);
        setMoviesSearchState(state);

        if(!value)
        {
            return;
        }
    }

    function doSearchMovies()
    {
        let query = moviesSearchState.query.toLowerCase();
        if(!query)
        {
            return;
        }
        if(!moviesFromApi.length)
        {
            if(!moviesFromApi.length)
            {
                let mss = '';
                if(mss = localStorage.getItem('movies-search-state'))
                {
                    if(mss != JSON.stringify(moviesSearchState))
                    {
                        preloaderOn();
                        newMoviesApi.getInitialMovies()
                            .then((data) => {
                                setMoviesFromApi(data);
                            })
                            .catch((err) => {
                                console.log('error', err)
                            })
                    }
                }
            }
            return;
        }
        const movies = moviesFromApi.filter((movie) => {
            if(moviesSearchState.short){
                return ( movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query) ) && movie.duration <= SHORT_FILM_DURATION
            } else {
                return movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query)
            }
        })
        changeClickCounter(1);
        preloaderOff();
        setRenderMovies(movies);
    }

    function handleSearchSavedMoviesForm(e) {
        e.preventDefault();
        const value = e.target.querySelector('[name="search"]').value.toLowerCase()
        setSavedMoviesSearchState({
            'query': value,
            'short': savedMoviesSearchState.short
        });
    }

    function doSearchSavedMovies()
    {
        let query = savedMoviesSearchState.query.toLowerCase();
        const movies = savedMovies.filter((movie) => {
            if(savedMoviesSearchState.short){
                return ( movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query) ) && movie.duration <= SHORT_FILM_DURATION
            } else {
                return movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query)
            }
        })
        changeClickCounter(1);
        setRenderMoviesSaved(movies);
    }

    React.useEffect(() => {
        doSearchMovies();
        localStorage.setItem('movies-search-state', JSON.stringify(moviesSearchState));
    }, [moviesSearchState,moviesFromApi])

    React.useEffect(() => {
        localStorage.setItem('movies-search-results', JSON.stringify(renderMovies));
    }, [renderMovies])

    React.useEffect(() => {
        doSearchSavedMovies();
    }, [savedMoviesSearchState])

    React.useEffect(() => {
        tokenCheck();
        if(loggedIn)
        {
            getSavedMovies();
        }
    }, [history, loggedIn])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <ProtectedRoute path="/movies"
                    loggedIn={loggedIn}
                    isPreloaderOn={isPreloaderOn}
                    searchState={moviesSearchState}
                    onSearch={handleSearchForm}
                    searchQueryRequired={true}
                    handleChange={toggleShortBaseSearch}
                    component={Movies}
                    movies={renderMovies}
                    savedMovies={savedMovies}
                    saveMovie={handleMovieLike}
                    deleteMovie={handleMovieDislike}
                    countClick={countClick}
                    isShowMore={showMore}
                />
                <ProtectedRoute path="/saved"
                    loggedIn={loggedIn}
                    isPreloaderOn={isPreloaderOn}
                    searchState={savedMoviesSearchState}
                    onSearch={handleSearchSavedMoviesForm}
                    searchQueryRequired={false}
                    handleChange={toggleShortSavedSearch}
                    component={Saved}
                    movies={renderMoviesSaved}
                    savedMovies={savedMovies}
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
                        onAutorization={handleAuthorization}
                    />
                </Route>
                <Route path="/signup">
                    <Register
                        onRegister={handleRegistration}
                        isValidate={useFormWithValidation}
                    />
                </Route>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>
                <Route render={Error}>
                </Route>
            </Switch>
        </CurrentUserContext.Provider>
    );
}
export default App;
