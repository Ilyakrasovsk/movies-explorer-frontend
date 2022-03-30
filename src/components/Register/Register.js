import logo from "../../images/logo.svg";
import useFormWithValidation from "../../hooks/useValidation";
import {Link} from "react-router-dom";

function Register(props) {
  const {values, handleChange, errors} = useFormWithValidation()

  function handleSubmit(e) {
    e.preventDefault();
    const {name, email, password} = values;
    props.onRegister({name, email, password});
  }

    return(
            <section className='register'>
            <div>
                <img className='register__icon' alt='Логотип' src={logo} />
                <h3 className='register__title'>Добро пожаловать!</h3>
                <form className='register__form' onSubmit={handleSubmit}>
                    <label className='register__label'>Имя</label>
                    <input type='text' id='form__input-name' className='register__input' name="name" minLength="2"
                    maxLength="20"
                    onChange={handleChange}
                    pattern="([а-яА-Яёa-zA-Z0-9.]|\s|-)*"
                    required/>
                    <span className="register__form_span">{errors?.name}</span>
                    <label htmlFor='email' className='register__label'>E-mail</label>
                    <input type='email' id='email' className='register__input'
                    name="name"
                    pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"
                    onChange={handleChange}
                    required
                    />
                    <span className="register__form_span">{errors?.email}</span>
                    <label htmlFor='password' className='register__label'>Пароль</label>
                    <input id='password' type='password' className='register__input'
                    name="password"
                    minLength="8"
                    maxLength="20"
                    onChange={handleChange}
                    required/>
                    <span className="register__form_span">{errors?.password}</span>
                    <button type='submit' className='register__button'>Зарегистрироваться</button>
                </form>
                <p className='register__enter-text'>Уже зарегистрированы? <Link className='register__enter-link' to={'/signin'}>Войти</Link></p>
                </div>
            </section>
    )
}
export default Register;
