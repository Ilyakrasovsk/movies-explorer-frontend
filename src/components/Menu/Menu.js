import './Menu.css';
import krest from '../../images/Group.svg';
import image from "../../images/icon__COLOR_icon-main.svg";
import {Link} from "react-router-dom";

function Menu() {
  function handleBurger() {
    const burgerMenu = document.querySelector('.menu');
    burgerMenu.classList.remove('menu_active')
  }
    return(

        <section className="menu">
            <div className="menu__container">
                <div className="menu__button-container">
                    <button onClick={handleBurger} className="menu__button">
                        <img src={krest}/>
                    </button>
                </div>
                <div className="menu__link-container">
                    <Link to={'/'} className="menu__link">Главная</Link>
                    <Link to={'/movies'} className="menu__link">Фильмы</Link>
                    <Link to={'/saved'} className="menu__link">Сохранённые фильмы</Link>
                </div>
                <div className="menu__account-container">
                    <Link to={'/profile'} className="menu__account-button"><p className="movies__header-name">Аккаунт</p>
                        <div className="menu__account-content"><img
                            src={image} className="menu__account-image"/>
                        </div>
                    </Link>
                </div>
            </div>
        </section>

    )
}
export default Menu;
