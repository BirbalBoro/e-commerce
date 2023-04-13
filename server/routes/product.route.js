const express = require('express');
const formidable = require('express-formidable')
const { login_compare_token, is_user_admin } = require('../middlewares/auth.middleware');
const { create_product_controller,
    all_product_controller,
    single_product_controller,
    thumbnail_product_controller,
    delete_product_controller,
    update_product_controller
} = require('../controllers/product.controller');


const router = express.Router();

//route for creating or adding a new product
router.post('/createproduct', login_compare_token, is_user_admin, formidable(), create_product_controller);

//route for getting a single product
router.get('/getsingleproduct/:id', single_product_controller);

//route for getting all the products
router.get('/getallproduct', all_product_controller);

//route for getting a particular thumbnail of a product using id
router.get('/getthumbnailproduct/:id', thumbnail_product_controller);

//route for deleting a particular product
router.delete('/deleteproduct/:id', delete_product_controller);

//route for updating a product using id
router.put('/updateproduct/:id', login_compare_token, is_user_admin, formidable(), update_product_controller);


module.exports = router;