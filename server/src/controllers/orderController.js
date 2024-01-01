const Order = require('../models/orderModel');

const placeOrder = async (req, res, next) => {
  try {
    const result = await Order.create(req.body);
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
    let query = {};

    if (req.query.orderStatus) {
      query = { orderStatus: req.query.orderStatus };
    }

    if (req.query.paymentStatus) {
      query = { paymentStatus: req.query.paymentStatus };
    }

    const result = await Order.find(query);
    const total = await Order.countDocuments(query);

    res
      .status(200)
      .json({ status: 'success', totalOrder: total, data: result });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const result = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
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

const deleteOrder = async (req, res, next) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
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

const showAllOrderInfo = async () => {
  try {
    const totalOrder = await Order.countDocuments();
    const totalProcessing = await Order.countDocuments({
      orderStatus: 'processing',
    });
    const totalProcessed = await Order.countDocuments({
      orderStatus: 'processed',
    });
    const totalShipped = await Order.countDocuments({ orderStatus: 'shipped' });
    const totalDelivered = await Order.countDocuments({
      orderStatus: 'delivered',
    });
    const totalCancelled = await Order.countDocuments({
      orderStatus: 'cancelled',
    });

    const totalVariantProductSale = await Order.aggregate([
      {
        $unwind: '$orderItems',
      },
      {
        $unwind: '$orderItems.variants',
      },
      {
        $group: {
          _id: {
            product: '$orderItems.product',
            // variant: '$orderItems.variants',
          },
          totalQuantity: { $sum: '$orderItems.variants.quantity' },
        },
      },
    ]);

    const orderInfo = {
      totalOrder,
      totalProcessing,
      totalProcessed,
      totalShipped,
      totalDelivered,
      totalCancelled,
    };
    const { totalQuantity } = totalVariantProductSale[0];

    return { orderInfo, totalProductSale: totalQuantity };
  } catch (error) {
    return error;
  }
};

module.exports = {
  placeOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  showAllOrderInfo,
};
