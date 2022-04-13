import vector from "../../images/logo.svg";
import image from "../../images/icon__COLOR_icon-main.svg";
import burger from "../../images/icon__COLOR_icon-menu.svg";
import {Link} from "react-router-dom";
function MoviesHeader() {
  function handleBurger() {
    const burgerMenu = document.querySelector('.menu');
    burgerMenu.classList.add('menu_active')
  }
    return(

        <header className="movies__header">
          <Link to={'/'}><img src={vector} className="header__logo" alt="logo"/></Link>
            <div className="movies__header-links">
                <Link to={'/movies'} className="movies__header-link">Фильмы</Link>
                <Link to={'/saved'} className="movies__header-link">Сохраненные фильмы</Link>
                <a onClick={handleBurger} className="movies__header-burger"><img src={burger} /></a>
            </div>
            <div className="movies__header-container">

                <Link to={'/profile'} className="movies__header-button">
                    <p className="movies__header-name">Аккаунт</p>
                    <div className="movies__header-content">
                        <img src={image} className="movies__header-image" />
                    </div>

                </Link>

            </div>
        </header>

    )
}
export default MoviesHeader;
