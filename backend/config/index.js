require('dotenv').config();

const JWT_SECRET = (process.env.NODE_ENV === 'production')
  ? process.env.JWT_SECRET
  : 'super-strong-secret';

const ALLOWED_CORS = (process.env.NODE_ENV === 'production')
  ? process.env.ALLOWED_CORS
  : 'localhost:3000';

module.exports = { JWT_SECRET, ALLOWED_CORS };
