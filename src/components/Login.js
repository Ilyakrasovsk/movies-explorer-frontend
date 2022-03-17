import logo from '../images/logo.svg';
function Login() {
  return (
    <>
        <section className='login'>
          <img className='login__icon' alt='Логотип' src={logo} />
          <h3 className='login__title'>Рады видеть!</h3>
          <form className='login__form'>
            <label for='email' className='login__label'>E-mail</label>
            <input type='email' id='email' className='login__input' />
            <label for='password' className='login__label'>Пароль</label>
            <input id='password' type='password' className='login__input' />
            <button type='submit' className='login__button'>Войти</button>
          </form>
          <p className='login__enter-text'>Ещё не зарегестрированы? <a className='login__enter-link' href='/sign-up'>Регистрация</a></p>
        </section>
    </>
  )
}
export default Login;
