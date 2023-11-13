export const BASE_URL = 'https://api.travel.students.nomoredomainsmonster.ru';

function _handleResponce(res) {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(_handleResponce);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(_handleResponce)
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(_handleResponce)
}