const express = require('express');
const { showDashboard } = require('../../controllers/dashboardController');

const router = express.Router();

router.get('/dashboard', showDashboard);

module.exports = router;
