
require("dotenv").config()
const mongoose = require("mongoose")

const blogDb = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL)

        console.log("Database is connected successfully")
    } catch (error) {
        console.log("Database is not connected", error)
    }
}

module.exports = blogDb

