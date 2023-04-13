const mongoose = require("mongoose");
const colors = require("colors");

const DB_connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Successfully connected to Mongodb Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error has occured in Mongodb ${error}`.bgRed.white);
    }
};

module.exports = { DB_connection };