import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }


  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_checked'}`;

  return (
    <li className="card">
      <div className="card__delete-container">
        {isOwn && <button type="button" className="card__delete" aria-label="Удалить" onClick={handleDeleteClick} />}
      </div>
      <img src={props.card.link} alt={props.card.name}
        className="card__image" onClick={handleClick} />
      <div className="card__footer">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button aria-label="Отметить понравившимся" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}