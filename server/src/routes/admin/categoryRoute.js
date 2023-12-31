const {
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
} = require('../../controllers/categoryController');

const router = require('express').Router();

// category
router.post('/category', addCategory);
router.get('/categories', getAllCategory);
router
  .route('/categories/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

// sub category
router.post('/sub-category', addSubCategory);
router.get('/sub-categories', getAllSubCategory);
router
  .route('/sub-categories/:id')
  .get(getSubCategory)
  .patch(updateSubCategory)
  .delete(deleteSubCategory);

module.exports = router;
