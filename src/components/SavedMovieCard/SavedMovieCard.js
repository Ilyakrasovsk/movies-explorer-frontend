import React from "react";

function SavedMovieCard(props) {
    console.log(props.movie._id)

    function onClick() {
        window.open(props.movie.trailer);
    }

    const durationHour = Math.floor(props.movie.duration / 60)
    const durationMinutes = Math.round(props.movie.duration % 60)
    console.log(props.movie)

    return(
        <>
            <article className="movies-card">
                <div className="movies-card__container">
                    <div  className="movies-card__image-container">

                        <button
                            className={`movies-card__button-ok`}
                            type="button"
                            aria-label="Bookmark Button"
                            value="Сохранить"
                            onClick={() => props.setDislike(props.movie._id)}
                        ></button>
                        <img className="movies-card__image" src={props.movie.image} onClick={onClick} />
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
export default SavedMovieCard;
