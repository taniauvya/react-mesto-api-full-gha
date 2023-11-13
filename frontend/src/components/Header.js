import logo from '../images/logo.svg';
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Header({email, signOut}) {

    const { pathname } = useLocation();

    let elem;
    if (pathname === '/signin') {
        elem = <Link className='header__link' to='/signup'>Регистрация</Link>;
    }
    else if (pathname === '/signup') {
        elem = <Link className='header__link' to='/signin'>Войти</Link>;
    }
    else {
        elem = (
            <div>
                <span className='header__email'>{email}</span>
                <button onClick={signOut} className="header__button-logout">Выйти</button>
            </div>
        );
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип Россия" />
            <div className="header__container-link">
                {elem}
            </div>
        </header>
    );
}