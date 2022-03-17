import vector from "../../images/logo.svg";
import image from "../../images/icon__COLOR_icon-main.svg";
import burger from "../../images/icon__COLOR_icon-menu.svg";
function MoviesHeader() {

    return(

        <header className="movies__header">
            <img src={vector} className="header__logo" alt="Место"/>
            <div className="movies__header-links">
                <a className="movies__header-link">Фильмы</a>
                <a className="movies__header-link">Сохраненные фильмы</a>
                <a className="movies__header-burger"><img src={burger} /></a>
            </div>
            <div className="movies__header-container">
                <button className="movies__header-button">
                    <p className="movies__header-name">Аккаунт</p>
                    <div className="movies__header-content">
                        <img src={image} className="movies__header-image" />
                    </div>

                </button>
            </div>
        </header>

    )
}
export default MoviesHeader;
