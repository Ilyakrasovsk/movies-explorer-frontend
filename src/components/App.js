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

    // core static
    const [moviesFromApi, setMoviesFromApi] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    // core dynamic
    const [renderMovies, setRenderMovies] = React.useState([]);
    const [renderMoviesSaved, setRenderMoviesSaved] = React.useState(savedMovies);
    // search dynamic
    const [moviesSearchState, setMoviesSearchState] = React.useState({
        'query': '',
        'short': false
    });
    const [savedMoviesSearchState, setSavedMoviesSearchState] = React.useState({
        'query': '',
        'short': false
    });

    // const [searchedMovies, setSearchedMovies] = React.useState([]);
    const [isPreloaderOn, setPreloaderOn] = React.useState(false);
    const [clickCounter, changeClickCounter] = React.useState(1);
    const [showMore, setShowMore] = React.useState(true);

    function countClick() {
        changeClickCounter(clickCounter+1)
    }

    // React.useEffect(() => {
    //     if (loggedIn) {
    //         history.push('/movies');
    //         if (localStorage.getItem("movies")) {
    //             setSearchedMovies(JSON.parse(localStorage.getItem("movies")))
    //         }
    //     }
    //     tokenCheck();
    // }, [history, loggedIn])

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/movies');
        }
        tokenCheck();
    }, [history, loggedIn])

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
                setCurrentUser(data.user)
                localStorage.setItem('profile', data.user.name)
                setEditProfileStatus(true);
            })
            .catch((err) => {
                setEditProfileStatus(false);
                console.log('error', err)
            })
    }

    React.useEffect(() => {
        if(loggedIn)
        {
            newMoviesApi.getInitialMovies()
                .then((data) => {
                    setMoviesFromApi(data);
                    // setRenderMovies(data);
                    localStorage.setItem('movies', JSON.stringify(data));
                })
                .catch((err) => {
                    console.log('error', err)
                })
            getSaveMovies();
        }
        else {
            localStorage.setItem('saved', JSON.stringify({}));
        }
    }, [history, loggedIn])

    function preloaderOn() {
        setPreloaderOn(true)
    }
    function preloaderOff() {
        setPreloaderOn(false)
    }

    function handleSearchForm(e) {
        e.preventDefault();
        const value = e. target.querySelector('[name="search"]').value.toLowerCase()
        console.log(moviesSearchState);
        setMoviesSearchState({
            'query': value,
            'short': moviesSearchState.short
        });
        console.log(moviesSearchState);

        if(!value)
        {
            return;
        }

        preloaderOn();
        searchMoviesForm();
        preloaderOff();
    }

    function searchMoviesForm()
    {
        let query = moviesSearchState.query.toLowerCase();
        if(!query)
        {
            return;
        }
        const movies = moviesFromApi.filter((movie) => {
            if(moviesSearchState.short){
                return ( movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query) ) && movie.duration <= 40
            } else {
                return movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query)
            }
        })
        changeClickCounter(1);
        setRenderMovies(movies);
    }

    function handleSearchSavedMoviesForm(e) {
        e.preventDefault();
        const value = e.target.querySelector('[name="search"]').value.toLowerCase()
        setSavedMoviesSearchState({
            'query': value,
            'short': savedMoviesSearchState.short
        });

        preloaderOn();
        searchSavedMoviesForm();
        preloaderOff();
    }

    function searchSavedMoviesForm()
    {
        let query = savedMoviesSearchState.query.toLowerCase();
        const movies = savedMovies.filter((movie) => {
            if(savedMoviesSearchState.short){
                return ( movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query) ) && movie.duration <= 40
            } else {
                return movie.nameRU?.toLowerCase().includes(query) || movie.nameEN?.toLowerCase().includes(query)
            }
        })
        changeClickCounter(1);
        setRenderMoviesSaved(movies);
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
            setRenderMoviesSaved(movies.data);
            localStorage.setItem('saved', JSON.stringify(movies.data));
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
                setRenderMoviesSaved(newSavedMovies);
            })
            .catch((err) => {
                console.log('error', err)
            })
    }

    function toggleShortBaseSearch(e)
    {
        setMoviesSearchState({
            'query': moviesSearchState.query,
            'short': !!e.target.checked
        });
        // if(moviesSearchState.query)
        // {
            // searchMoviesForm();
        // }
    }

    function toggleShortSavedSearch(e)
    {
        setSavedMoviesSearchState({
            'query': savedMoviesSearchState.query,
            'short': !!e.target.checked
        });
        // searchSavedMoviesForm();
    }

    React.useEffect(() => {
        searchMoviesForm();
    }, [moviesSearchState])

    React.useEffect(() => {
        searchSavedMoviesForm();
    }, [savedMoviesSearchState])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>

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
