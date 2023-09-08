const express = require('express');
const {registerUser} = require('../controllers/userControllers');
const {authUser} = require('../controllers/userControllers');
const {products} = require('../controllers/productController');
const {showProducts} = require('../controllers/productController');
const {updateProducts} = require ('../controllers/productController');
const {deleteProduts} = require ('../controllers/productController');

const router = express.Router();


router.route('/').post(registerUser);           //for register
router.route('/login').post(authUser);          //for login
router.route('/products').post(products);      //api route to update products from admin users
router.route('/showproducts').get(showProducts); //showing all the products to users
router.route('/updateproducts/:id').put(updateProducts); //upating the stocks 
router.route('/delete').delete(deleteProduts);  //delete all the products

module.exports = router;