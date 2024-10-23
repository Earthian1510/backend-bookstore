const express = require("express")
const cors = require("cors")
const app = express()

const { initializeDatabase } = require("./db/connection.db")
const { Books } = require("./models/books.model")

app.use(cors())
app.use(express.json())

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello Express!")
})

app.get("/books", async (req, res) => {
    try{
        const allBooks = await Books.find();
        res.json(allBooks);
    }
    catch(error) {
        res.status(500).json({error: "Internal server error"})
    }
})

app.post("/books", async (req, res) => {
    const { bookName, author, genre } = req.body;

    try {
        const bookData = new Books({ bookName, author, genre })
        await bookData.save()
        res.status(201).json(bookData)
    }
    catch(error) {
        res.status(500).json({error: "Internal server error"})
    }

})

app.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const updateBook = req.body;

    try{
        const updatedBook = await Books.findByIdAndUpdate(bookId, updateBook, {new: true})
        if(!updatedBook) {
            return res.status(404).json({ message: "book not found"})
        }

        res.status(200).json(updatedBook)
    }  
    catch(error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }

})

app.delete("/books/:id", async (req, res) => {
    const bookId = req.params.id 

    try{
        const deletedBook = await Books.findByIdAndDelete(bookId)
        if(!deletedBook){
            return res.status(404).json({ error: "Book not found" })
        }

        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})