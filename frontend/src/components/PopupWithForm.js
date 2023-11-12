export default function PopupWithForm({ isOpen, onClose, onSubmit, name, title, buttonText, children }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} tabIndex="0">
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>

        <form name={name} className="popup__form" onSubmit={onSubmit}>

          {children}

          <button aria-label="Сохранить изменения" className="popup__submit popup__button" type="submit">
            {buttonText}
          </button>

        </form>

        <button aria-label="Закрыть" id="popup-button-close" className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );

}