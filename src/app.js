const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// internal imports
const productRoutes = require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoute');

const globalErrorHandler = require('./errors/globalErrorHandler');
const databaseErrorHandler = require('./errors/databaseErrorHandler');

const app = express();

// express middleware
app.use(express.json(), cors());
app.use(fileUpload());

// routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);

// database error handler
app.use(databaseErrorHandler);

// global error handler
app.use(globalErrorHandler);

module.exports = app;
