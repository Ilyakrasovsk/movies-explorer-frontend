import vector from "../images/logo.svg";

function Header () {
    return(
    <header className="header">
        <a href="/" className="header__logo-link"> <img src={vector} className="header__logo" alt="Место"/></a>
        <div className="header__container">
            <a className="header__link" href="/sign-up">Регистрация</a>
            <button className="header__button" type="button"><a className="header__button-link" href="/sign-in">Войти</a></button>
        </div>
    </header>
    );
}
export default Header;
