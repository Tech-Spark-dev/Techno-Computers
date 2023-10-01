const express = require('express');
const {registerUser} = require('../controllers/userControllers');
const {authUser} = require('../controllers/userControllers');
const {products} = require('../controllers/productController');
const {showProducts} = require('../controllers/productController');
const {updateProducts} = require ('../controllers/productController');
const {deleteProduts} = require ('../controllers/productController');
const {Address} = require('../controllers/cartController');
const {userAddress} = require('../controllers/cartController');
const {updatePayment} = require('../controllers/cartController');
const {userscart} = require('../controllers/cartController');
const {updateProductinfo} = require('../controllers/productController');

const router = express.Router();


router.route('/').post(registerUser);           //for register
router.route('/login').post(authUser);          //for login
router.route('/products').post(products);      //api route to update products from admin users
router.route('/showproducts').get(showProducts); //showing all the products to users
router.route('/updateproducts/:id').put(updateProducts); //upating the stocks 
router.route('/delete/:id').delete(deleteProduts);  //delete all the products
router.route('/postaddress').post(Address);        //saving all the addresses
router.route('/address').get(userAddress);          //retreiving all the address and carts of all users
router.route('/payment/:id').put(updatePayment);       //updating the payment info
router.route('/userscart/:userid').get(userscart);      //getting the users cart with address
router.route('/updateproductinfo/:id').put(updateProductinfo); 

module.exports = router;