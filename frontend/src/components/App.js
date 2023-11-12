import React from 'react';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isRegisterResultPopupOpen, setIsRegisterResultPopupOpen] = React.useState(false);
  const [isRegisterError, setIsRegisterError] = React.useState(false);
  const [isLoginResultPopupOpen, setIsLoginResultPopupOpen] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: "", name: "" });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [email, setEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(
    () => {
      if (loggedIn) {
        api.getUserData()
          .then(userData => {
            setCurrentUser(userData);
          })
          .catch(console.error);

        api.getInitialCards()
          .then(initialCardsData => {
            setCards(initialCardsData);
          })
          .catch(console.error);
      }
    }
    , [loggedIn]
  );

  const handleTokenCheck = () => {

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true })
        }
      })
        .catch(console.error);
    }
  }


  React.useEffect(
    () => {
      handleTokenCheck();
    }
    , []
  );

  function handleEditAvatarClick(evt) {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(evt) {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(evt) {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsLoginResultPopupOpen(false);
    setIsRegisterResultPopupOpen(false);
    setSelectedCard({ link: "", name: "" });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.updateLikeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(console.error);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch(console.error);
  }

  function handleUpdateUser(user) {
    api.updateUserData(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(user) {
    api.updateAvatar(user.avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleRegister(password, email) {
    return auth.register(password, email)
      .then((data) => {
        if (data) {
          setIsRegisterError(false);
          setIsRegisterResultPopupOpen(true);
          navigate('/signin', { replace: true });
        }
      })
      .catch(err => {
        console.error('Ошибка регистрации: ', err);
        setIsRegisterError(true);
        setIsRegisterResultPopupOpen(true);
      });
  }

  function handleLogin(password, email) {
    return auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.error('Ошибка при входе: ', err);
        setIsLoginError(true);
        setIsLoginResultPopupOpen(true);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} />

        <InfoTooltip isOpen={isRegisterResultPopupOpen} onClose={closeAllPopups} isSuccess={!isRegisterError} name="register"
          titleSuccess="Вы успешно зарегистрировались!" titleError="Что-то пошло не так! Попробуйте ещё раз." />

        <InfoTooltip isOpen={isLoginResultPopupOpen} onClose={closeAllPopups} isSuccess={!isLoginError} name="login"
          titleSuccess="" titleError="Что-то пошло не так! Попробуйте ещё раз." />

        <Routes>
          <Route path="/"
            element={<ProtectedRouteElement element={Home} loggedIn={loggedIn}
              currentUser={currentUser} cards={cards} selectedCard={selectedCard} isEditProfilePopupOpen={isEditProfilePopupOpen}
              isAddPlacePopupOpen={isAddPlacePopupOpen} isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              closeAllPopups={closeAllPopups} handleCardDelete={handleCardDelete}
              handleCardLike={handleCardLike} handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick} handleEditAvatarClick={handleEditAvatarClick}
              handleCardClick={handleCardClick} handleUpdateUser={handleUpdateUser}
              handleAddPlaceSubmit={handleAddPlaceSubmit} handleUpdateAvatar={handleUpdateAvatar}
            />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;