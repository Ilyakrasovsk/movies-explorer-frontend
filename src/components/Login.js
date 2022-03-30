import logo from '../images/logo.svg';
import useFormWithValidation from "../hooks/useValidation";
import {Link} from "react-router-dom";

function Login(props) {
  const {values, handleChange, errors} = useFormWithValidation()

  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = values;
    props.onAutorization({email, password})
  }
  return (
    <section className='login'>
        <div>
          <img className='login__icon' alt='Логотип' src={logo} />
          <h3 className='login__title'>Рады видеть!</h3>
          <form className='login__form' onSabmit={props.handleSubmit}>
            <label htmlFor='email' className='login__label'>E-mail</label>
            <input type='email' name='name' id='email' className='login__input' pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"
            onChange={handleChange}
            required />
            <span className='register__form_span'>{errors.email}</span>
            <label htmlFor='password' className='login__label'>Пароль</label>
            <input id='password' name='password' type='password' className='login__input' minLength="8"
            maxLength="20"
            required
            onChange={handleChange}/>
            <span className='register__form_span'>{errors.password}</span>
            <button type='submit' className='login__button'>Войти</button>
          </form>
          <p className='login__enter-text'>Ещё не зарегестрированы? <Link className='login__enter-link' to={'/sign-up'}>Регистрация</Link></p>
        </div>
    </section>
  )
}
export default Login;
