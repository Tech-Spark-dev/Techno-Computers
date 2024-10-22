const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const generateToken = require("../utils/generatetoken");

const products = asyncHandler(async (req, res) => {
  const { name,originalprice, price, description, image,image1,image2,isavailable } = req.body;

  const product = await Product.create({
    //create new record in database
    name,
    originalprice,
    price,
    description,
    image,
    image1,
    image2,
    isavailable,
  });

  if (product) {
    res.status(201).json({
      //check products successfully stored and used for authentication
      _id: product.id,
      name: product.name,
      originalprice: product.originalprice,
      price: product.price,
      image: product.image,
      image1: product.image1,
      image2: product.image2,
      description: product.description,
      isavailable: product.isavailable,
      token: generateToken(product._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

const showProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const searchTerm = (req.query.search) || '';
  const skip = (page - 1) * limit;

  const query = Product.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
    if (searchTerm) {
      query.or([
        { name: { $regex: new RegExp(searchTerm, 'i') } }, // Search by product name (case-insensitive)
        { description: { $regex: new RegExp(searchTerm, 'i') } } // Search by product description (case-insensitive)
      ]);
    }
  const products = await query.exec();
  const totalProductCount = await Product.countDocuments({}); // Count all documents in the collection

  res.json({products,totalProductCount});
});

const updateProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      isavailable: "false",
    },
    { new: true }
  );
  res.json(updateProduct);
});

const deleteProduts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product.deleteOne({ _id: id });
  res.status(202).json("Deleted Successfully");
});

const updateProductinfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const {originalprice} = req.body;
  const { price } = req.body;
  const { description } = req.body;
  const {image} = req.body;

  const updateproductsinfo = await Product.findByIdAndUpdate(
    id,
    {
      name: name,
      originalprice:originalprice,
      price: price,
      description: description,
      image: image
    },
    { new: true }
  );
  if (!updateproductsinfo) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(updateproductsinfo);
});

module.exports = {
  products,
  showProducts,
  updateProducts,
  deleteProduts,
  updateProductinfo,
};
