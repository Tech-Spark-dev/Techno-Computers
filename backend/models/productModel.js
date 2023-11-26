const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isavailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://t4.ftcdn.net/jpg/01/42/34/87/360_F_142348781_I6OPT1NpR1a4Kpyx1CFvzA3hEUUXNhtW.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
