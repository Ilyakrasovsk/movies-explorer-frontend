import React from "react";
import {beatFilmUrl} from "../../utils/constants";

function MoviesCard(props) {
  const isLiked = props.fromSaved.some(({ movieId }) => props.movie.id === movieId)
  function handleLike(e) {
    if (isLiked) {
      const id = props.fromSaved.find(({ movieId }) => props.movie.id === movieId)._id
      props.setDislike(id ? id : props.movie.id)
    } else {
      props.setLike(props.movie)
    }
  }
  function onClick() {
    window.open(props.movie.trailerLink);
  }

  const durationHour = Math.floor(props.movie.duration / 60)
  const durationMinutes = Math.round(props.movie.duration % 60)
  let buttonClass = 'movies-card__button'
  if (isLiked) {
    buttonClass = 'movies-card__button-ok'
  } else {
    buttonClass = 'movies-card__button'
  }
    return(
        <>
        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movies-card__image-container">
                    <button
                        className={`movies-card__button ${buttonClass}`}
                        type="button"
                        aria-label="Bookmark Button"
                        value="Сохранить"
                        onClick={handleLike}
                    ></button>
                    <img className="movies-card__image" src={beatFilmUrl + props.movie.image.url} onClick={onClick} />

                </div>
                <div className="movie-card__info">
                    <h3 className="movies-card__name">{props.movie.nameRU}</h3>
                    <p className="movies-card__duration">{durationHour}ч {durationMinutes}мин</p>
                </div>

            </div>
        </article>
        </>
    )
}
export default MoviesCard;
