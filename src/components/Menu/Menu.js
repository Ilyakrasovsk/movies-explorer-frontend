import './Menu.css';
import krest from '../../images/Group.svg';
import image from "../../images/icon__COLOR_icon-main.svg";
function Menu() {

    return(

        <section className="menu">
            <div className="menu__container">
                <div className="menu__button-container">
                    <button className="menu__button">
                        <img src={krest}/>
                    </button>
                </div>
                <div className="menu__link-container">
                    <a className="menu__link">Главная</a>
                    <a className="menu__link">Фильмы</a>
                    <a className="menu__link">Сохранённые фильмы</a>
                </div>
                <div className="menu__account-container">
                    <button className="menu__account-button"><p className="movies__header-name">Аккаунт</p>
                        <div className="menu__account-content"><img
                            src={image} className="menu__account-image"/>
                        </div>
                    </button>
                </div>
            </div>
        </section>

    )
}
export default Menu;
