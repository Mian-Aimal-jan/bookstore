const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// ✅ GET /api/books — Get all books with optional search + pagination
// Usage: /api/books?author=rowling&genre=fantasy&page=1&limit=5
router.get('/', async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    // Build dynamic filter for search
    const filter = {};
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre)  filter.genre  = { $regex: genre,  $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);

    const books = await Book.find(filter)
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET /api/books/:id — Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// ✅ POST /api/books — Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, price } = req.body;

    // Validate required fields
    if (!title || !author || price === undefined) {
      return res
        .status(400)
        .json({ error: 'title, author, and price are required fields' });
    }

    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT /api/books/:id — Update an existing book by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, author, price } = req.body;

    // Validate required fields
    if (!title || !author || price === undefined) {
      return res
        .status(400)
        .json({ error: 'title, author, and price are required fields' });
    }

    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE /api/books/:id — Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

module.exports = router;




