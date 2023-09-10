const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userid:{
      type:String,
      required:true,
    },
    name:{
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
    phonenumber:{
      type:String,
      required:true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark:{
        type:String,
        required:false
    }
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model('address',addressSchema);

module.exports = AddressModel;
