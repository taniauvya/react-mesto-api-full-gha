import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const inputNameRef = React.useRef();
    const inputLinkRef = React.useRef();

    React.useEffect(() => {
        inputNameRef.current.value = '';
        inputLinkRef.current.value = '';
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value
        });
    }

    return (
        <PopupWithForm buttonText="Создать" title="Новое место" name="add-place" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input ref={inputNameRef} className="popup__input popup__input_place_name" name="placeName" type="text" id="place-name-input"
                    defaultValue="" placeholder="Название" minLength="2" maxLength="30" required />
                <div className="popup__input-error-padding"></div>
                <span className="popup__form-input-error place-name-input-error"></span>
            </div>
            <div className="popup__input-container">
                <input ref={inputLinkRef} className="popup__input popup__input_place_link" name="placeLink" type="url" id="place-link-input" defaultValue=""
                    placeholder="Ссылка на картинку" required />
                <div className="popup__input-error-padding"></div>
                <span className="popup__form-input-error place-link-input-error"></span>
            </div>
        </PopupWithForm>
    );
}