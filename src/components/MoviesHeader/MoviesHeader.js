import vector from "../../images/logo.svg";
import image from "../../images/icon__COLOR_icon-main.svg";
import burger from "../../images/icon__COLOR_icon-menu.svg";
function MoviesHeader() {

    return(

        <header className="movies__header">
            <img src={vector} className="header__logo" alt="Место"/>
            <div className="movies__header-links">
                <a href='/movies' className="movies__header-link">Фильмы</a>
                <a href='/saved' className="movies__header-link">Сохраненные фильмы</a>
                <a className="movies__header-burger"><img src={burger} /></a>
            </div>
            <div className="movies__header-container">
            <a href='/profile' className="movies__header-container-link">
                <button className="movies__header-button">
                    <p className="movies__header-name">Аккаунт</p>
                    <div className="movies__header-content">
                        <img src={image} className="movies__header-image" />
                    </div>

                </button>
                </a>
            </div>
        </header>

    )
}
export default MoviesHeader;
