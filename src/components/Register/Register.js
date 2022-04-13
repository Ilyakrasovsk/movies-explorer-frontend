import React, { useState, useEffect, useContext } from 'react';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Register(props) {
  const validator = require('validator');

  const [inputValues, setInputValues] = useState({name: '', password: '', email: ''});
  const [inputErrors, setInputErrors] = useState({name: '', password: '', email: ''});
  const [inputValid, setInputValid] = useState({name: false, password: false, email: false});

  const isNotChange = false;

  function validateField(input) {
      if (input.name !== 'email')
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
      props.onRegister({
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password,
      });
  }

    return(
            <section className='register'>
            <div>
                <Link to={'/'}>
                <img className='register__icon' alt='Логотип' src={logo} />
                 </Link>
                <h3 className='register__title'>Добро пожаловать!</h3>
                <form className='register__form' onSubmit={handleSubmit}>
                    <label className='register__label'>Имя</label>
                    <input
                        id="name"
                        type="name"
                        name='name'
                        className="register__input"
                        value={inputValues.name}
                        placeholder="Ввeдите имя"
                        minLength="2"
                        maxLength="20"
                        pattern="([а-яА-Яёa-zA-Z0-9.]|\s|-)*"
                        onChange={handleValuesChange}
                        required/>
                    { (!inputValid.name) ? (<span className="register__form_span">{inputErrors.name}</span>) : ('') }
                    <label htmlFor='email' className='register__label'>E-mail</label>
                    <input
                        id="email"
                        type="email"
                        name='email'
                        className="register__input"
                        value={inputValues.email}
                        placeholder="Ввeдите email"
                        onChange={handleValuesChange}
                        required/>
                    { (!inputValid.email) ? (<span className="register__form_span">{inputErrors.email}</span>) : ('') }
                    <label htmlFor='password' className='register__label'>Пароль</label>
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
                    <button type='submit' className='register__button' disabled={(!inputValid.email || !inputValid.password || !inputValid.name) || isNotChange}>Зарегистрироваться</button>
                </form>
                <p className='register__enter-text'>Уже зарегистрированы? <Link className='register__enter-link' to={'/signin'}>Войти</Link></p>
                </div>
            </section>
    )
}
export default Register;
