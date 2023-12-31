const express = require('express');
const {
  getOrders,
  getOrder,
  placeOrder,
  updateOrder,
  deleteOrder,
} = require('../../controllers/orderController');

const router = express.Router();

router.route('/order').post(placeOrder);
router.route('/orders').get(getOrders);
router
  .route('/orders/:id')
  .get(getOrder)
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = router;
