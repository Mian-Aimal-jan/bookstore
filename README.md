# Bookstore API Proposal

## Overview
A simple Node.js and Express API for managing bookstore inventory.
This app uses MongoDB with Mongoose to store book records and supports full CRUD operations.

## Purpose
- Manage book data in MongoDB
- Provide REST endpoints for create, read, update, delete
- Support search by author and genre
- Add pagination and request logging
- Include basic error handling

## API Endpoints
- `GET /api/books` — list books with optional search and pagination
- `GET /api/books/:id` — get a single book by ID
- `POST /api/books` — create a new book
- `PUT /api/books/:id` — update an existing book
- `DELETE /api/books/:id` — delete a book

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with a MongoDB URI:
   ```text
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/bookstore
   PORT=5000
   ```
3. Run the server:
   ```bash
   npm run dev
   ```

## Notes
- Keep `.env` private and do not commit it.
- This README is intended as a short proposal/reference file.



