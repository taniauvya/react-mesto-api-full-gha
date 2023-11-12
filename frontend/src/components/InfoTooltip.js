import imgError from '../images/popup-error.png'
import imgSuccess from '../images/popup-success.png'

export default function InfoTooltip({ isOpen, onClose, isSuccess, name, titleSuccess, titleError }) {

    const img = isSuccess ? imgSuccess : imgError;
    const title = isSuccess ? titleSuccess : titleError;

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} tabIndex="0">
            <div className="popup__container">

                <div className="popup__container-result">
                    <img className="popup__image-result" src={img} alt="Результат" />
                    <h2 className="popup__title-result">{title}</h2>
                </div>

                <button aria-label="Закрыть" id="popup-button-close" className="popup__close" type="button" onClick={onClose} />
            </div>
        </div>
    );

}