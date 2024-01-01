const {
  addNewOffer,
  deleteOffer,
  getAllOffer,
  getOffer,
  updateOffer,
} = require('../../controllers/offerController');

const express = require('express');

const router = express.Router();

router.route('/offer').post(addNewOffer);
router.route('/offers').get(getAllOffer);
router
  .route('/offers/:id')
  .get(getOffer)
  .patch(updateOffer)
  .delete(deleteOffer);

module.exports = router;
