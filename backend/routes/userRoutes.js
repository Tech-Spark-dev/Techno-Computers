const express = require('express');
const {registerUser} = require('../controllers/userControllers');
const {authUser} = require('../controllers/userControllers');
const {products} = require('../controllers/productController');


const router = express.Router();


router.route('/').post(registerUser);           //for register
router.route('/login').post(authUser);          //for login
router.route('/products').post(products);      //api route to check for admin users

module.exports = router;