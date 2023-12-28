const { Category, SubCategory } = require('../models/productModel');

const addCategory = async (req, res, next) => {
  try {
    const result = await Category.create(req.body);

    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.find().select('-id -__v');

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const result = await Category.find({ _id: req.params.id }).populate(
      'products'
    );

    if (!result) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No document found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      totalCategory: result[0].products.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const result = await Category.findByIdAndUpdate(req.params.id, req.body, {
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

const deleteCategory = async (req, res, next) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);

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

const addSubCategory = async (req, res, next) => {
  try {
    const result = await SubCategory.create(req.body);

    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getAllSubCategory = async (req, res, next) => {
  try {
    const result = await SubCategory.find().select('-id -__v');

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSubCategory = async (req, res, next) => {
  try {
    const result = await SubCategory.find({ _id: req.params.id }).populate(
      'products'
    );

    if (!result) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No document found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      totalCategory: result[0].products.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubCategory = async (req, res, next) => {
  try {
    const result = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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

const deleteSubCategory = async (req, res, next) => {
  try {
    const result = await SubCategory.findByIdAndDelete(req.params.id);

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
  getAllCategory,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  getAllSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
