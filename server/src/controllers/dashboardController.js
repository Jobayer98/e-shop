const { showAllOrderInfo } = require('../controllers/orderController');

const showDashboard = async (req, res, next) => {
  try {
    const orderInfo = await showAllOrderInfo();
    res.status(200).json({ status: 'success', data: orderInfo });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  showDashboard,
};
