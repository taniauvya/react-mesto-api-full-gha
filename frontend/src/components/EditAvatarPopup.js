import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText="Сохранить" title="Обновить аватар" name="edit-avatar" isOpen={isOpen} onClose={onClose}>
            <div className="popup__input-container">
                <input ref={inputRef} className="popup__input popup__input_avatar_link" name="avatarLink" type="url" id="avatar-link-input"
                    defaultValue="" placeholder="Ссылка на аватарку" required />
                <div className="popup__input-error-padding"></div>
                <span className="popup__form-input-error avatar-link-input-error"></span>
            </div>
        </PopupWithForm>
    );
}