const { ALLOWED_CORS: ALLOWED_CORS_CONF } = require('../config');

const allowedCors = [`http://${ALLOWED_CORS_CONF}`, `https://${ALLOWED_CORS_CONF}`];

// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);

    // Обработка ошибки
    // Failed to load resource: Credentials flag is true,
    // but Access-Control-Allow-Credentials is not "true".
    res.header('Access-Control-Allow-Credentials', 'true');

    // Если это предварительный запрос, добавляем нужные заголовки
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      // сохраняем список заголовков исходного запроса
      const requestHeaders = req.headers['access-control-request-headers'];
      // разрешаем кросс-доменные запросы с этими заголовками
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }
  }

  return next();
};
