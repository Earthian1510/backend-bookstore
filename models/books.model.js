const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: String,
    author: String,
    genre: String 
})

const BookDB = mongoose.model("BookDB", bookSchema)
module.exports = { BookDB }