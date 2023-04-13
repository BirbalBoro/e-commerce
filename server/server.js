const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const { DB_connection } = require("./config/db");
const auth_route = require("./routes/auth.route");
const category_route = require("./routes/category.route");
const product_route = require("./routes/product.route");

//configure env
dotenv.config();

//database config
DB_connection();

//this is rest object
const app = express();

//middleswares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", auth_route);
app.use("/api/v1/category", category_route);
app.use("/api/v1/product", product_route);

// this is rest api
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to e-Commerce",
    });
});


//defining PORT
const PORT = process.env.PORT || 8000;


//run listen
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port number ${PORT}`);
});