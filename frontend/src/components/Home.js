import React from 'react';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';


function Home({
  cards, selectedCard, isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, closeAllPopups,
  handleCardDelete, handleCardLike, handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick,
  handleCardClick, handleUpdateUser, handleAddPlaceSubmit,
  handleUpdateAvatar
}) {

  return (
    <>
      <Main cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default Home;