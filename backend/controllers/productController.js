const asyncHandler = require ('express-async-handler');
const Product = require('../models/productModel');
const generateToken = require('../utils/generatetoken');


const products = asyncHandler(async(req,res)=>{
    const {name,price,description,image,isavailable} = req.body;

    const product = await Product.create({       //create new record in database
            name,
            price,
            description,
            image,
            isavailable
    });

    if(product){ 
        res.status(201).json({              //check products successfully stored and used for authentication
            _id:product.id,
            name:product.name,
            price:product.price,
            image:product.image,
            description:product.description,
            isavailable:product.isavailable,
            token:generateToken(product._id) 

        })

    }
    else{
        res.status(400);
        throw new Error("Error Occurred");
    }

})

const showProducts =asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products); 
})

const updateProducts = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    const updateProduct = await Product.findByIdAndUpdate(id,{
        'isavailable':'false'
    }, { new: true });
    res.json(updateProduct);
})


module.exports = {products,showProducts,updateProducts};