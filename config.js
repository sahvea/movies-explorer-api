require('dotenv').config();

const {
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV = 'development',
  JWT_SECRET = 'super-strong-secret',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGO_URL,
  NODE_ENV,
  JWT_SECRET,
  PORT,
};
