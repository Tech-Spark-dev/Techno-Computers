const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const generateToken = require("../utils/generatetoken");

const products = asyncHandler(async (req, res) => {
  const { name, price, description, image, isavailable } = req.body;

  const product = await Product.create({
    //create new record in database
    name,
    price,
    description,
    image,
    isavailable,
  });

  if (product) {
    res.status(201).json({
      //check products successfully stored and used for authentication
      _id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10 if not provided in the query
  const products = await Product.find({})
  .sort({ createdAt: -1 })
  .limit(limit);
  res.json(products);
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
  const { price } = req.body;
  const { description } = req.body;
  const {image} = req.body;

  const updateproductsinfo = await Product.findByIdAndUpdate(
    id,
    {
      name: name,
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
