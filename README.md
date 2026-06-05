# Bookstore API Proposal

## Overview
A simple Node.js and Express API for managing a bookstore inventory.
The app uses MongoDB with Mongoose to store books and provides basic CRUD operations.

## Purpose
- Store book data in MongoDB
- Provide REST endpoints for create, read, update, delete
- Support search by author/genre and pagination
- Include error handling and request logging

## Key Features
- `GET /api/books` — list books with search and pagination
- `GET /api/books/:id` — retrieve a specific book
- `POST /api/books` — add a new book
- `PUT /api/books/:id` — update a book
- `DELETE /api/books/:id` — delete a book

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add MongoDB URI to `.env`:
   ```text
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/bookstore
   PORT=5000
   ```
3. Run the server:
   ```bash
   npm run dev
   ```

## Notes
- The project is intended as a proposal/readme reference file.
- Keep the `.env` file private and do not commit it to source control.
