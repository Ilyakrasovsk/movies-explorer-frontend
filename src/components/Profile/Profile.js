import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useValidation";

export const Profile = (props) => {
    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid} = useFormWithValidation()
    const nameProfile = localStorage.getItem('profile');
    const overlayProfile = document.querySelector('.profile__overlay');
    const isCurrentName = values.name === currentUser.name;
    const isCurrentEmail = values.email === currentUser.email;
    let apple;
    if(nameProfile != null){
        apple = nameProfile;
    }
    else {
        apple = currentUser.name
    }
    function handleSubmit(e){
        e.preventDefault()
        const {name, email} = values;
        props.onUpdateUser({name, email});
        overlayProfile.classList.add('profile__overlay_active');

    }
    function closeOverlay(){
        overlayProfile.classList.remove('profile__overlay_active')
    }
    return (
        <>
        <MoviesHeader />
        <section className="profile">
            <form className="profile__container" onSubmit={handleSubmit}>
                <h3 className="profile__title">{`Привет, ${apple}!`}</h3>
                <div className="profile__text-container">
                    <div className="profile__text-content">
                        <p className="profile__name">Имя</p>
                        <input id="profile__input-name" type="text" name="name" value={values.name} placeholder={currentUser.name} required minLength="2" maxLength="30" onChange={handleChange} className="profile__name"/>
                    </div>
                    <span>{errors.name}</span>
                    <div className="profile__text-content">
                        <p className="profile__email">E-mail</p>
                        <input id="profile__input-name" type="email" name="email" value={values.email} placeholder={currentUser.email} required minLength="2" maxLength="30" onChange={handleChange} className="profile__email"/>
                    </div>
                    <span>{errors.email}</span>
                </div>
                <div className="profile__links">
                    <button type="submit" className={`${isValid && isCurrentEmail && isCurrentName ? 'profile__link-redact' : 'profile__link-redact profile__edit-button_novalidate'}`} disabled={isValid && isCurrentEmail && isCurrentName}>Редактировать</button>
                    <Link onClick={props.onLogOut} className="profile__link-exit">Выйти из аккаунта</Link>
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
