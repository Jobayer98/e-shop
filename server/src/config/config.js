require('dotenv').config();

const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

module.exports = {
  mongo_uri,
  port,
};
