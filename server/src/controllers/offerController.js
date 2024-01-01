const Offer = require('../models/offerModel');

const addNewOffer = async (req, res, next) => {
  try {
    req.body.startDate = Date.now();
    req.body.endDate = req.body.startDate + req.body.hours * 60 * 60 * 1000;
    const result = await Offer.create(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getAllOffer = async (req, res, next) => {
  try {
    const result = await Offer.find();
    const count = await Offer.countDocuments();
    res
      .status(200)
      .json({ status: 'success', totalOffer: count, data: result });
  } catch (error) {
    next(error);
  }
};

const getOffer = async (req, res, next) => {
  try {
    const result = await Offer.findById(req.params.id);
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

const updateOffer = async (req, res, next) => {
  try {
    const result = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

const deleteOffer = async (req, res, next) => {
  try {
    const result = await Offer.findByIdAndDelete(req.params.id);
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

module.exports = {
  addNewOffer,
  getAllOffer,
  getOffer,
  updateOffer,
  deleteOffer,
};
