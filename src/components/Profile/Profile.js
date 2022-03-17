import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MoviesHeader from "../MoviesHeader/MoviesHeader";

export const Profile = (props) => {

    return (
        <>
        <MoviesHeader />
        <section className="profile">
            <div className="profile__container">
                <h3 className="profile__title">Привет, Виталий!</h3>
                <div className="profile__text-container">
                    <div className="profile__text-content">
                        <p className="profile__name">Имя</p>
                        <p className="profile__name">Виталий</p>
                    </div>
                    <div className="profile__text-content">
                        <p className="profile__email">E-mail</p>
                        <p className="profile__email">pochta@yandex.ru</p>
                    </div>
                </div>
                <div className="profile__links">
                    <a className="profile__link-redact">Редактировать</a>
                    <a className="profile__link-exit">Выйти из аккаунта</a>
                </div>
            </div>

        </section>
        </>
    );
}
export default Profile;
