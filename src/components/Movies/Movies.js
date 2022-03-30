import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";
import React from "react";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'));
    return(
        <main>
            <MoviesHeader />
            <Menu />
            <SearchForm onSearch={props.onSearch} isActive={props.isActive} handleChange={props.handleChange} />
            <Preloader isOn={props.isPreloaderOn}/>
            <MoviesCards counterMoviesSearch={props.counterMoviesSearch} movies={props.moviesLocalStorage} setLike={props.saveMovie} setDislike={props.deleteMovie} savedMovies={props.savedMovies}/>
            <Footer />
        </main>
    )
}
export default Movies;
