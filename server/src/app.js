const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// internal imports
const productRoutes = require('./routes/admin/productRoute');
const categoryRoutes = require('./routes/admin/categoryRoute');
const orderRoutes = require('./routes/admin/orderRoute');
const offerRoutes = require('./routes/admin/offerRoute');
const paymentRoutes = require('./routes/admin/paymentRoute');

const globalErrorHandler = require('./errors/globalErrorHandler');
const databaseErrorHandler = require('./errors/databaseErrorHandler');

const app = express();

// express middleware
app.use(express.json(), cors());
app.use(fileUpload());

// routes
app.use('/api/v1/admin', productRoutes);
app.use('/api/v1/admin', categoryRoutes);
app.use('/api/v1/admin', orderRoutes);
app.use('/api/v1/admin', offerRoutes);
app.use('/api/v1/admin', paymentRoutes);

// database error handler
app.use(databaseErrorHandler);

// global error handler
app.use(globalErrorHandler);

module.exports = app;
