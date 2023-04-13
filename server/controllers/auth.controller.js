const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const { compare_password } = require("../utils/utils");



//signup functionality
const signup_controller = async (req, res) => {
    try {
        //get the data from the user
        const { username, email, password, phone, address } = req.body;

        //validation of data
        if (!username) {
            return res.send({ message: 'Username is required' });
        }
        if (!email) {
            return res.send({ message: 'Email is required' });
        }
        if (!password) {
            return res.send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.send({ message: 'Phone number is required' });
        }
        if (!address) {
            return res.send({ message: 'Address is required' });
        }

        //Check if the user is already registered
        const registered_user = await user_model.findOne({ email });
        if (registered_user) {
            return res.status(200).send({
                success: false,
                message:'You are already registered! Please Login',
            })
        }

        //register the new user
        const new_user = await new user_model({ username, email, phone, address, password, }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            new_user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured in signup process",
            error
        })
    }
}

//signin or login functionality
const login_controller = async (req, res) => {
    try {
        const { email, password } = req.body;

        //server side validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Email or password is incorrect",
            })
        }

        //check if the user is registered or not before login
        const user = await user_model.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered! Please signup",
            })
        }

        //compare input password with password in database
        if (password !== user.password) {
            return res.status(200).send({
                success: false,
                message:'Invalid password',
            })
        }

        //token
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: '30d',
        });

        //if login is successfull
        res.status(200).send({
            success: true,
            message: "Login is successfull",
            user: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured in login process",
            error,
        })
    }
}


const test_controller = (req, res) => {
    return res.send({
        message:"Protected route",
    })
}

module.exports = { signup_controller, login_controller, test_controller};