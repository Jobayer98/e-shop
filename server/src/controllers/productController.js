const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// internal imports
const { Product } = require('../models/productModel');

const getProducts = async (req, res, next) => {
  try {
    const result = await Product.find({});
    const quantity = await Product.countDocuments();

    res
      .status(200)
      .json({ success: true, totalProduct: quantity, data: result });
  } catch (error) {
    next(error);
  }
};

// get a single product
const getProduct = async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id);

    if (!result) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No document found with that ID' });
    }

    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

// insert a new product
const addProduct = async (req, res, next) => {
  try {
    const result = await Product.create(req.body);

    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

// insert bulk products
const insertManyProduct = async (req, res, next) => {
  try {
    // const csvFile = req.files.file;
    let products = [];

    // fs.createReadStream(path.join(__dirname, 'products.csv'))
    fs.createReadStream(path.join(__dirname, 'products.csv'))
      .pipe(csv())
      .on('data', (row) => {
        const product = {
          name: row.name,
          price: parseFloat(row.price),
          description: row.description,
          variants: JSON.parse(row.variants).map((variant) => ({
            color: variant.color,
            sizes: variant.sizes.map((size) => ({
              size: size.size,
              available: size.available === 'true',
              quantity: parseInt(size.quantity),
            })),
          })),
          image_url: row.image_url,
          cover_images_url: row.cover_images_url
            ? row.cover_images_url.split(',')
            : [],
          rating: parseFloat(row.rating),
          numReviews: parseInt(row.numReviews),
          reviews: row.reviews ? JSON.parse(row.reviews) : [],
          inStock: row.inStock === 'true',
          category: new mongoose.Types.ObjectId(row.category),
          subCategory: new mongoose.Types.ObjectId(row.subCategory),
        };

        products.push(product);
      })
      .on('end', async () => {
        const result = await Product.insertMany(products);

        res.status(201).json({ status: 'success', data: result });
      });
  } catch (error) {
    next(error);
  }
};

// update product
const updateProduct = async (req, res, next) => {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
    console.log(error);
    next(error);
  }
};

// delete product
const deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);

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
  getProducts,
  addProduct,
  insertManyProduct,
};
module.exports = {
  getProducts,
  getProduct,
  addProduct,
  insertManyProduct,
  updateProduct,
  deleteProduct,
};
