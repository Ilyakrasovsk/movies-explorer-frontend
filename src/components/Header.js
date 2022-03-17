import vector from "../images/logo.svg";

function Header () {
    return(
    <header className="header">
        <img src={vector} className="header__logo" alt="Место"/>
        <div className="header__container">
            <a className="header__link" href="/sign-up">Регистрация</a>
            <button className="header__button" type="button">Войти</button>
        </div>
    </header>
    );
}
export default Header;
