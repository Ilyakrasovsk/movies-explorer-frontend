import image from '../../images/pic__COLOR_pic.png'
import gala from '../../images/save3.svg'

function MoviesCard() {

    return(
        <>
        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movies-card__image-container">
                    <button
                        className='movies-card__button'
                        type="button"
                        aria-label="Bookmark Button"
                    >Сохранить</button>
                    <img className="movies-card__image" src={image} />

                </div>
                <div className="movie-card__info">
                    <h3 className="movies-card__name">33 слова о дизайне</h3>
                    <p className="movies-card__duration">1ч 17м</p>
                </div>

            </div>
        </article>

        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movies-card__image-container">
                    <button
                        className='movies-card__button-ok'
                        type="button"
                        aria-label="Bookmark Button"
                    ></button>
                    <img className="movies-card__image" src={image} />

                </div>
                <div className="movie-card__info">
                    <h3 className="movies-card__name">33 слова о дизайне</h3>
                    <p className="movies-card__duration">1ч 17м</p>
                </div>

            </div>
        </article>
        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movies-card__image-container">
                    <button
                        className='movies-card__button'
                        type="button"
                        aria-label="Bookmark Button"
                    >Сохранить</button>
                    <img className="movies-card__image" src={image} />

                </div>
                <div className="movie-card__info">
                    <h3 className="movies-card__name">33 слова о дизайне</h3>
                    <p className="movies-card__duration">1ч 17м</p>
                </div>

            </div>
        </article>
        </>
    )
}
export default MoviesCard;
