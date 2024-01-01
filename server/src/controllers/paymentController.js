const Payment = require('../models/paymentModel');

const makePayment = async (req, res, next) => {
  try {
    const result = await Payment.create(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getPayments = async (req, res, next) => {
  try {
    const result = await Payment.find();
    const count = await Payment.countDocuments();

    res
      .status(200)
      .json({ status: 'success', totalPayment: count, data: result });
  } catch (error) {
    next(error);
  }
};
const getPayment = async (req, res, next) => {
  try {
    const result = await Payment.findById(req.params.id);
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

module.exports = { makePayment, getPayments, getPayment };
