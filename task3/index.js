const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

//home route
app.get("/", (req, res) => {
  res.status(200).json( "Welcome to the Book API" );
});



// GET - Get all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});


// POST - Add new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json(newBook);
});


// PUT - Update book by ID
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});


// DELETE - Remove book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(bookIndex, 1);

  res.status(200).json({ message: "Book deleted successfully" });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});