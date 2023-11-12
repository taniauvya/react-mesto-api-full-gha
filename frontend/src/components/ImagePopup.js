export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_zoom ${props.card.link !== '' ? "popup_opened" : ""}`} tabIndex="0">
      <div className="popup__container-zoom">
        <img src={props.card.link} alt={props.card.name}
          className="popup__image-zoom" />
        <h2 className="popup__title-zoom">{props.card.name}</h2>
        <button aria-label="Закрыть" className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}