const express = require('express');
const { signup_controller, login_controller, test_controller } = require('../controllers/auth.controller');
const { login_compare_token, is_user_admin } = require("../middlewares/auth.middleware");

const router = express.Router();

//register or signup routing
router.post('/signup', signup_controller);

//login or signin routing
router.post('/login', login_controller);

router.get('/test', login_compare_token, is_user_admin, test_controller);

//private route for user
router.get('/authenticate-user', login_compare_token,
    (req, res) => {
        res.status(200).send({ ok: true });
    }
);

//protected route for admin
router.get('/authenticate-admin', login_compare_token, is_user_admin, (req, res) => {
    res.status(200).send({ ok: true });
});

module.exports = router;