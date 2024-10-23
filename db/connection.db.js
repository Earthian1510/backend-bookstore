const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGO_DB;

const initializeDatabase = async () => {
    try{
        const connection = await mongoose.connect(mongoURI)
        if(connection) {
            console.log("Connected Successfully")
        }
    }
    catch(error) {
        console.log("Connection Failed", error)
    }
}

module.exports = { initializeDatabase }