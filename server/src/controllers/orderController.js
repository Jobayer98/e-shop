const { Order } = require('../models/orderModel');

const placeOrder = async (req, res, next) => {
  try {
    const result = Order.create(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const result = await Order.findById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'No document found with that ID' });
    }
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.orderStatus) {
      query = { orderStatus: req.query.orderStatus };
    }

    const result = await Order.find(query);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { placeOrder, getOrder, getOrders };
