const mongoose = require('mongoose');
const { mongo_uri } = require('../config/config');

const dbConnection = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
