import React from "react";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import SavedMovieCards from "../SavedMovieCards/SavedMovieCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";

function Saved(props) {
    return(
        <main>
            <MoviesHeader />
            <Menu />
            <SearchForm onSearch={props.onSearch} searchState={props.searchState} handleChange={props.handleChange} searchQueryRequired={props.searchQueryRequired} />
            <SavedMovieCards counterMoviesSearch={props.counterMoviesSearch} movies={props.movies} savedMovies={props.savedMovies} setLike={props.saveMovie} setDislike={props.deleteMovie}
            />
            <Footer />
        </main>
    )
}
export default Saved;
