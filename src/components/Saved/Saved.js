import React from "react";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import SavedMovieCards from "../SavedMovieCards/SavedMovieCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";

function Saved(props) {
  const moviesLocalStorage = JSON.parse(localStorage.getItem('saved-movies'));
    return(
        <main>
            <MoviesHeader />
            <Menu />
            <SearchForm onSearch={props.onSearch} isActive={props.isActive} handleChange={props.handleChange} />
            <SavedMovieCards countMoviesSavedSearch={props.countSavedMoviesSearch} savedLike={moviesLocalStorage} movies={moviesLocalStorage} setLike={props.saveMovie} setDislike={props.deleteMovie} savedMovies={props.savedMovies}
            />
            <Footer />
        </main>
    )
}
export default Saved;
