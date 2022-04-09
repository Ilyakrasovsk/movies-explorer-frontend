import SavedMovieCard from "../SavedMovieCard/SavedMovieCard";
import React, {useEffect} from "react";
import {useMediaQuery} from "react-responsive";

function SavedMovieCards(props) {
    const [renderedMoviesCount, setRenderedMoviesCount] = React.useState(6);
    const isTablet = useMediaQuery({ query: '(max-width: 1270px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 710px)' });

    function clickButtonMoreFilm() {
        if(isMobile){
            setRenderedMoviesCount(renderedMoviesCount+1)
        }else if(isTablet){
            setRenderedMoviesCount(renderedMoviesCount+2)
        }else{
            setRenderedMoviesCount(renderedMoviesCount+3)
        }
    }

    React.useEffect(() => {
        setRenderedMoviesCount(6);
    }, [props.movies]);

    return(
        <section className="cards">
            <div className="cards__container">
            {!props.movies && <span>Ничего не найдено</span>}
                {
                    props.movies && props.movies.slice(0, renderedMoviesCount).map((movie) =>
                      (
                        <SavedMovieCard  movie={movie} key={movie.movieId ? movie.movieId : movie.id}
                        setLike={props.setLike}
                        setDislike={props.setDislike}
                        fromSaved={props.savedLike}
                        />
                      ))
                }
            </div>
            { (props.movies.length > renderedMoviesCount) && (
              <div className="cards__button-container">
                <button onClick={clickButtonMoreFilm} className={'cards__more'}>
                  Ещё
                </button>
              </div>
            )}
        </section>
    )
}
export default SavedMovieCards;
