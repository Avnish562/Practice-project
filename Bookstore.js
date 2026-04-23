const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const Student=require('./models/student');
const app=express();
app.use(express.json());
const PORT=process.env.PORT || 3000;
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  
/* ================= BOOK SCHEMA ================= */
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        enum: ["fiction", "Non-fiction"]
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

/* ================= ROUTES ================= */

// CREATE Book

app.post("/books", async (req, res) => {
    try {
        const book = new Book(req.body);
        const saved = await book.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all books
app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// GET single book
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE book
app.put("/books/:id", async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Book not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE book
app.delete("/books/:id", async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ================= SERVER ================= */
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
