import LoginRegisterForm from './LoginRegisterForm';
import React, { useState } from 'react';

function Login({ onLogin }) {

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

        onLogin(formValue.password, formValue.email)
        .then(() => setFormValue({ email: '', password: '' }));
    }


    return (
        <LoginRegisterForm name="login" title="Вход" buttonText="Войти" onSubmit={handleSubmit} >
            <div className="loginregister__input-container">
                <input className="loginregister__input" name="email" type="email"
                    placeholder="Email" value={formValue.email} onChange={handleChange} required />
            </div>
            <div className="loginregister__input-container">
                <input className="loginregister__input" name="password" type="password"
                    placeholder="Пароль" value={formValue.password} onChange={handleChange} required />
            </div>
        </LoginRegisterForm>
    );
}

export default Login;