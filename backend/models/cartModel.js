const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: false
    },
    total: {
      type: Number,
      required: true
    },
    ispaid: {
      type: String,
      required: true,
      default: 0
    },
    details: [{
      name: String,
      price: Number,
      qty: Number,
    }],
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model('address_cart', addressSchema);

module.exports = AddressModel;
