import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export const Profile = (props) => {
    const overlayProfile = document.querySelector('.profile__overlay');

    const validator = require('validator');

    const [inputValues, setInputValues] = useState({name: '', email: ''});
    const [inputErrors, setInputErrors] = useState({name: '', email: ''});
    const [inputValid, setInputValid] = useState({name: false, email: false});

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    const isNotChange = currentUser.email === inputValues.email && currentUser.name === inputValues.name;

    useEffect(() => {
        if (currentUser) {
            setInputValues({name: currentUser.name, email: currentUser.email});
            setInputValid({name: true, email: true});
        }
    }, [currentUser]);

    function validateField(input) {
        if (input.name === 'name')
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
        props.onUpdateUser({
            name: inputValues.name,
            email: inputValues.email,
        });
        overlayProfile && overlayProfile.classList.add('profile__overlay_active');
    }
    function closeOverlay(){
        overlayProfile && overlayProfile.classList.remove('profile__overlay_active')
    }
    return (
        <>
        <MoviesHeader />
        <section className="profile">
            <form className="profile__container" onSubmit={handleSubmit}>
                <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
                <div className="profile__text-container">
                    <div className="profile__text-content">
                        <p className="profile__label">Имя</p>
                        <input
                            id="profile__input-name"
                            type="text"
                            name='name'
                            className="profile__input"
                            value={inputValues.name}
                            placeholder="Ввeдите имя"
                            onChange={handleValuesChange}
                            minLength="2"
                            maxLength="30"
                            required/>
                    </div>
                    { (!inputValid.name) ? (<span className="profile__input-error">{inputErrors.name}</span>) : ('') }
                    <div className="profile__text-content">
                        <p className="profile__label">E-mail</p>
                        <input
                            id="profile__input-name"
                            type="email"
                            name='email'
                            className="profile__input"
                            value={inputValues.email}
                            placeholder="Ввeдите email"
                            onChange={handleValuesChange}
                            required/>
                    </div>
                    { (!inputValid.email) ? (<span className="profile__input-error">{inputErrors.email}</span>) : ('') }
                </div>
                <div className="profile__links">
                    <button
                        type='submit'
                        className={`profile__link-redact ${(!inputValid.email || !inputValid.name) || isNotChange?'profile__edit-button_novalidate' : ''}`}
                        disabled={(!inputValid.email || !inputValid.name) || isNotChange}
                        >Редактировать</button>
                    <Link to="/" onClick={props.onLogOut} className="profile__link-exit">Выйти из аккаунта</Link>
                </div>
            </form>

        </section>
          <div className={'profile__overlay'} onClick={closeOverlay}>
            <div className={'profile__popup'}>
              <p className={'profile__popup-text'}>
                Данные обновлены!
              </p>
            </div>
          </div>
        </>
    );
}
export default Profile;
