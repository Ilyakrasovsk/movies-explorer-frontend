import logo from "../../images/logo.svg";

function Register() {

    return(
        <>
            <section className='register'>
                <img className='register__icon' alt='Логотип' src={logo} />
                <h3 className='register__title'>Добро пожаловать!</h3>
                <form className='register__form'>
                    <label htmlFor='email' className='register__label'>Имя</label>
                    <input type='text' id='name' className='register__input'/>
                    <label for='email' className='register__label'>E-mail</label>
                    <input type='email' id='email' className='register__input' />
                    <label for='password' className='register__label'>Пароль</label>
                    <input id='password' type='password' className='register__input' />
                    <button type='submit' className='register__button'>Зарегистрироваться</button>
                </form>
                <p className='register__enter-text'>Уже зарегистрированы? <a className='register__enter-link' href='/sign-in'>Войти</a></p>
            </section>
        </>
    )
}
export default Register;
