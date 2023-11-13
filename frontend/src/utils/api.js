class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _fetch(url, method, body) {
    const bodyStr = body === null ? null : JSON.stringify(body);

    const headers = { ...this.headers };
    const jwt = localStorage.getItem('jwt');
    if (jwt)
      headers.authorization = `Bearer ${jwt}`;

    return fetch(
      `${this.baseUrl}/${url}`,
      {
        method,
        headers,
        body: bodyStr
      })
      .then(res => this._handleResponce(res));
  }

  getInitialCards() {
    return this._fetch('cards', 'GET', null);
  }

  getUserData() {
    return this._fetch('users/me', 'GET', null);
  }

  updateUserData(userData) {
    return this._fetch('users/me', 'PATCH', userData);
  }

  updateLikeCard(cardId, doLike) {
    return this._fetch(`cards/${cardId}/likes`, doLike ? 'PUT' : 'DELETE');
  }

  addCard(cardData) {
    return this._fetch('cards', 'POST', cardData);
  }

  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`, 'DELETE');
  }

  updateAvatar(avatarLink) {
    return this._fetch('users/me/avatar', 'PATCH', { avatar: avatarLink });
  }
}

export default new Api({
  baseUrl: 'https://api.travel.students.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
