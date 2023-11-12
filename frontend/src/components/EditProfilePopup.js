import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm buttonText="Сохранить" title="Редактировать профиль" name="edit-profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input className="popup__input popup__input_type_name" name="name" id="name-input" type="text"
                    placeholder="Имя" minLength="2" maxLength="40" value={name} onChange={handleNameChange} required />
                <div className="popup__input-error-padding"></div>
                <span className="popup__form-input-error name-input-error"></span>
            </div>
            <div className="popup__input-container">
                <input className="popup__input popup__input_type_job" name="info" id="job-input" type="text"
                    placeholder="О себе" minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} required />
                <div className="popup__input-error-padding"></div>
                <span className="popup__form-input-error job-input-error"></span>
            </div>
        </PopupWithForm>
    );
}