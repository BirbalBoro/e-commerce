const jwt = require("jsonwebtoken");
const user_model = require("../models/user.model");

//functionality for protecting the routes by comapring the token
const login_compare_token = async (req, res, next) => {
    try {
        const jwt_decode = jwt.verify(req.headers.authorization, process.env.SECRET);
        req.user = jwt_decode;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"authentication middleware error! while comparing token",
        })
    }
}

//middleware for admin access or login
const is_user_admin = async (req, res, next) => {
    try {
        const user = await user_model.findById(req.user._id);

        //check if the user is admin or not
        if (!user.role) {
            return res.status(404).send({
                success: false,
                message: "Unauthorized Access! You are not admin"
            })
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: true,
            messsage: "Error has occured in admin access middleware",
        })
    }
}


module.exports = { login_compare_token, is_user_admin };