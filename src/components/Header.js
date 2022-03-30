import vector from "../images/logo.svg";
import {Link} from "react-router-dom";
import image from "../images/icon__COLOR_icon-main.svg";

function Header (props) {
    return(
    <header className="header">
        <Link to={'/'} className="header__logo-link"> <img src={vector} className="header__logo" alt="logo"/></Link>
        {
          (!props.loggedIn) ? (
            <div className="header__container">
                <Link className="header__link" to='/signup'>Регистрация</Link>
                <Link className="header__button" type="button" to='/signin'><p className="header__text">Войти</p></Link>
            </div>
          ) : (
            <>
              <div className="movies__header-links">
                      <Link to={'/movies'} className="movies__headermain-link">Фильмы</Link>
                      <Link to={'/saved'} className="movies__headermain-link">Сохраненные фильмы</Link>
                  </div>
              <div className="movies__header-container">
              <Link to={'/profile'} className="movies__header-button">
              <p className="movies__header-name">Аккаунт</p>
              <div className="movies__header-content">
              <img src={image} className="movies__header-image" />
              </div>

              </Link>
              </div>
            </>
          )
        }

    </header>
    );
}
export default Header;
