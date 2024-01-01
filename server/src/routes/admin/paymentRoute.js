const express = require('express');
const {
  makePayment,
  getPayments,
  getPayment,
} = require('../../controllers/paymentController');

const router = express.Router();

router.route('/payment').post(makePayment);
router.route('/payments').get(getPayments);
router.report('/payment/:id').get(getPayment);

module.exports = router;
