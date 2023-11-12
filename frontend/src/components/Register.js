import LoginRegisterForm from './LoginRegisterForm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValue.email || !formValue.password) {
            return;
        }

        onRegister(formValue.password, formValue.email)
            .then(() => setFormValue({ email: '', password: '' }));
    }


    return (
        <>
            <LoginRegisterForm name="register" title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit} >
                <div className="loginregister__input-container">
                    <input className="loginregister__input" name="email" type="email"
                        placeholder="Email" value={formValue.email} onChange={handleChange} required />
                </div>
                <div className="loginregister__input-container">
                    <input className="loginregister__input" name="password" type="password"
                        placeholder="Пароль" value={formValue.password} onChange={handleChange} required />
                </div>
            </LoginRegisterForm>
            <div className='register__link-container'>
                <Link className='register__link' to='/signin'>Уже зарегистрированы? Войти</Link>
            </div>
        </>
    );
}

export default Register;