const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

categorySchema.set('toObject', {
  virtuals: true,
});
categorySchema.set('toJSON', {
  virtuals: true,
});

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
});

const Category = mongoose.model('Category', categorySchema);

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  },
});

subCategorySchema.set('toObject', {
  virtuals: true,
});
subCategorySchema.set('toJSON', {
  virtuals: true,
});

subCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subCategory',
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    variants: [
      {
        color: {
          type: String,
          required: true,
        },
        sizes: [
          {
            size: {
              type: String,
              required: true,
            },
            available: {
              type: Boolean,
              default: true,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
    image_url: {
      type: String,
      // required: true,
    },
    cover_images_url: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        rating: Number,
        comment: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Category,
  SubCategory,
  Product,
};
