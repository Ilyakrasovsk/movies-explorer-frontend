import React, { useState, useEffect, useContext } from 'react';
import logo from '../images/logo.svg';
import {Link} from "react-router-dom";

function Login(props) {
  const validator = require('validator');

  const [inputValues, setInputValues] = useState({password: '', email: ''});
  const [inputErrors, setInputErrors] = useState({password: '', email: ''});
  const [inputValid, setInputValid] = useState({password: false, email: false});

  const isNotChange = false;

  function validateField(input) {
      if (input.name === 'password')
          return input.validity.valid
      else if (input.name === 'email')
          return validator.isEmail(input.value) && input.validity.valid
  }

  function handleValuesChange(e) {
      setInputValues({
          ...inputValues,
          [e.target.name]: e.target.value
      });
      setInputValid({
          ...inputValid,
          [e.target.name]: validateField(e.target)
      });
      setInputErrors({
          ...inputValid,
          [e.target.name]: e.target.validationMessage
      });
  }

  function handleSubmit(e) {
      e.preventDefault();
      props.onAutorization({
          password: inputValues.password,
          email: inputValues.email,
      });
  }

  return (
    <section className='login'>
        <div>
          <Link to={'/'}>
          <img className='login__icon' alt='Логотип' src={logo} />
          </Link>
          <h3 className='login__title'>Рады видеть!</h3>
          <form className='login__form' onSubmit={handleSubmit}>
            <label htmlFor='email' className='login__label'>E-mail</label>
            <input
                id="email"
                type="email"
                name='email'
                className="login__input"
                value={inputValues.email}
                placeholder="Ввeдите email"
                onChange={handleValuesChange}
                required/>
            { (!inputValid.email) ? (<span className="register__form_span">{inputErrors.email}</span>) : ('') }
            <label htmlFor='password' className='login__label'>Пароль</label>
            <input
                id="password"
                type="password"
                name='password'
                className="login__input"
                minLength="8"
                maxLength="20"
                value={inputValues.password}
                placeholder="Ввeдите пароль"
                onChange={handleValuesChange}
                required/>
            { (!inputValid.password) ? (<span className="register__form_span">{inputErrors.password}</span>) : ('') }
            <button type='submit' className='login__button' disabled={(!inputValid.email || !inputValid.password) || isNotChange}>Войти</button>
          </form>
          <p className='login__enter-text'>Ещё не зарегестрированы? <Link className='login__enter-link' to={'/signup'}>Регистрация</Link></p>
        </div>
    </section>
  )
}
export default Login;
