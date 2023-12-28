const {
  getProducts,
  getProduct,
  addProduct,
  insertManyProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = require('express').Router();

router.get('/products', getProducts);
router.post('/product', addProduct);
router.post('/products', insertManyProduct);
router
  .route('/products/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
