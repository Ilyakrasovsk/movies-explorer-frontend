import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useValidation";

export const Profile = (props) => {
    const overlayProfile = document.querySelector('.profile__overlay');

    const {name, email} = React.useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid} = useFormWithValidation({
        name: '',
        email: '',
    })
    const [hasChanges, setHasChanges] = React.useState(false);

    React.useEffect(() => {
        values.name = name;
        values.email = email;
    }, []);

    React.useEffect(() => {
        setHasChanges((values.name !== name) || (values.email !== email));
    }, [values.name, values.email, name, email]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({ name: values.name || name, email: values.email || email });
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
                <h3 className="profile__title">{`Привет, ${name}!`}</h3>
                <div className="profile__text-container">
                    <div className="profile__text-content">
                        <p className="profile__label">Имя</p>
                        <input id="profile__input-name" type="text" name="name" value={values.name||name} placeholder={name} required minLength="2" maxLength="30" onChange={handleChange} className="profile__input"/>
                    </div>
                    <span>{errors.name}</span>
                    <div className="profile__text-content">
                        <p className="profile__label">E-mail</p>
                        <input id="profile__input-name" type="email" name="email" value={values.email||email} placeholder={email} required minLength="2" maxLength="30" onChange={handleChange} className="profile__input"/>
                    </div>
                    <span>{errors.email}</span>
                </div>
                <div className="profile__links">
                    <button type='submit'
                        disabled={!hasChanges || !isValid}
                        className={`${ (!isValid || !hasChanges || props.isLoading) ? 'profile__link-redact' : 'profile__link-redact profile__edit-button_novalidate'}`}>Редактировать</button>
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
