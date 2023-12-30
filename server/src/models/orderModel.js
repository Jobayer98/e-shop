const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        variants: [
          {
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
          },
        ],
      },
    ],
    orderStatus: {
      type: String,
      default: 'Processing',
      enum: ['Processing', 'Processed', 'Shipped', 'Delivered', 'Cancelled'],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['Paid', 'Unpaid'],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'Card', 'Bkash', 'SSLCommerz'],
    },
    billingAddress: {
      type: Object,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
