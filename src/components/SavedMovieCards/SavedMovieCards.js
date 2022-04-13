import SavedMovieCard from "../SavedMovieCard/SavedMovieCard";
import React, {useEffect} from "react";
import {useMediaQuery} from "react-responsive";
import { BASE_CARDS_COUNT, PC_CARDS_COUNT_RAISE, TABLET_CARDS_COUNT_RAISE, MOBILE_CARDS_COUNT_RAISE } from "../../utils/constants";

function SavedMovieCards(props) {
    const [renderedMoviesCount, setRenderedMoviesCount ] = React.useState(BASE_CARDS_COUNT);
    const isTablet = useMediaQuery({ query: '(max-width: 1270px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 710px)' });
    function clickButtonMoreFilm() {
      if(isMobile) {
        setRenderedMoviesCount(renderedMoviesCount+MOBILE_CARDS_COUNT_RAISE)
      }else if(isTablet) {
        setRenderedMoviesCount(renderedMoviesCount+TABLET_CARDS_COUNT_RAISE)
      }else {
        setRenderedMoviesCount(renderedMoviesCount+PC_CARDS_COUNT_RAISE)
      }
    }

    React.useEffect(() => {
        setRenderedMoviesCount(6);
    }, [props.movies]);

    return(
        <section className="cards">
        {
            (!props.movies.length)
            ?
            ( <span className="nothing-found-btw">Ничего не найдено</span> )
            :
            (
                <div className="cards__container">
                {
                    props.movies.slice(0, renderedMoviesCount).map((movie) =>
                    (
                      <SavedMovieCard  movie={movie} key={movie.movieId ? movie.movieId : movie.id}
                        setLike={props.setLike} setDislike={props.setDislike} fromSaved={props.savedMovies}
                      />
                    ))
                }
            </div>
            )
        }
        {
          (props.movies.length > renderedMoviesCount) && (
            <div className="cards__button-container">
                <button onClick={clickButtonMoreFilm} className="cards__more">
                    Ещё
                </button>
            </div>
          )
        }
        </section>
    )
}
export default SavedMovieCards;
