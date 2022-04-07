import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { useMediaQuery } from 'react-responsive';

function MoviesCards(props) {
  const [renderedMoviesCount, setRenderedMoviesCount ] = React.useState(6);
  const isTablet = useMediaQuery({ query: '(max-width: 1270px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 710px)' });
  function clickButtonMoreFilm() {
    if(isMobile) {
      setRenderedMoviesCount(renderedMoviesCount+1)
    }else if(isTablet) {
      setRenderedMoviesCount(renderedMoviesCount+2)
    }else {
      setRenderedMoviesCount(renderedMoviesCount+3)
    }
  }
  console.log(props);
    return(
        <section className="cards">
            <div className="cards__container">

              {props.counterMoviesSearch && <span>Ничего не найдено</span>}
              {
                !(props.counterMoviesSearch) && props.movies.slice(0, renderedMoviesCount).map((movie) =>
                (
                  <>
                    <MoviesCard  movie={movie} key={movie.movieId ? movie.movieId : movie.id}
                      setLike={props.setLike} setDislike={props.setDislike} fromSaved={props.savedMovies}
                    />
                  </>
                ))
              }
            </div>
            <>
            {
              !(props.counterMoviesSearch) && (
                <div className="cards__button-container">
                    <button onClick={clickButtonMoreFilm} className="cards__more">
                        Ещё
                    </button>
                </div>
              )
            }
            </>
        </section>
    )
}
export default MoviesCards;
