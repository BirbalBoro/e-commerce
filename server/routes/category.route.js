const express = require('express');
const { login_compare_token, is_user_admin } = require('../middlewares/auth.middleware');
const { create_category_controller,
    update_category_controller,
    single_category_controller,
    all_category_controller,
    delete_category_controller
} = require('../controllers/category.controller');

const router = express.Router();

//route for creating a new category
router.post('/createcategory', login_compare_token, is_user_admin, create_category_controller);

//route for updating a existing category
router.put('/updatecategory/:id', login_compare_token, is_user_admin, update_category_controller);

//route for getting a particular category
router.get('/getsinglecategory/:id', login_compare_token, is_user_admin, single_category_controller);

//route for getting all the categories
router.get('/getallcategory', login_compare_token, is_user_admin, all_category_controller);

//route for deleting a particular category
router.get('/deletecategory/:id', login_compare_token, is_user_admin, delete_category_controller)



module.exports = router;