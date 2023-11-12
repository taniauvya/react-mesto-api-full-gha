import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardLike, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="avatar">
          <img src={currentUser.avatar} alt="Аватар" className="avatar__image" />
          <button aria-label="Редактировать аватар" type="button" className="avatar__button-edit" onClick={onEditAvatar} ></button>
        </div>

        <div className="profile__info">
          <div className="profile__name-edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button aria-label="Редактировать профиль" className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button aria-label="Загрузить изображение" id="place-button-add" className="profile__button-add"
          type="button" onClick={onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => (
            <Card onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} key={card._id} card={card} />
          ))}
        </ul>
      </section>

    </main>
  );
}