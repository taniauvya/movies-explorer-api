require('dotenv').config();

const JWT_SECRET = (process.env.NODE_ENV === 'production')
  ? process.env.JWT_SECRET
  : 'super-strong-secret';

const ALLOWED_CORS = (process.env.NODE_ENV === 'production')
  ? process.env.ALLOWED_CORS
  : 'localhost:3000';

const MONGO_URL = (process.env.NODE_ENV === 'production')
  ? process.env.MONGO_URL
  : 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = { JWT_SECRET, ALLOWED_CORS, MONGO_URL };
