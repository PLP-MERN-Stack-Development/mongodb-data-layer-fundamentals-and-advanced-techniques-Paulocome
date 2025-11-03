 ## Description

This repository contains the implementation of the exercise **Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques**.  
The goal is to demonstrate the use of **CRUD operations**, **aggregation pipelines**, **indexing**, and **advanced queries** using MongoDB.

The database used is called `plp_bookstore` and contains a collection named `books`, which stores information about various books.

---

## Repository Structure

- `insert_books.js` – Script to populate the `books` collection with 12 sample books.  
- `queries.js` – Script containing all MongoDB queries for the exercise tasks (basic CRUD, advanced queries, aggregation, and indexing).  
- `README.md` – This file, explaining how to run the scripts.  
- `screenshot.png` – Screenshot of MongoDB Compass or Atlas showing the `books` collection.

---

## Requirements

- Node.js installed (v14+ recommended)  
- MongoDB Community Edition or a MongoDB Atlas account  
- MongoDB Compass or MongoDB Shell (`mongosh`) is optional for visual verification  

---

## How to Run

### 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd <REPOSITORY_NAME>

 2. Install Dependencies
npm install mongodb

3. Populate the Collection

Run the insert_books.js script to create the database and insert sample books:

node insert_books.js

This script will:

Connect to MongoDB

Create the plp_bookstore database and books collection

Insert 12 sample books

Drop the collection if it already exists to avoid duplication

Display all inserted books in the console

4. Run Queries

Run the queries.js script:
node queries.js

node queries.js
This script performs:

Basic CRUD operations (find, update, delete)

Advanced queries (filtering, projection, sorting, pagination)

Aggregation pipelines (average price by genre, author with the most books, count by decade)

Index creation (title and compound index author + published_year)

Performance demonstration using explain()

Notes

For MongoDB Atlas users, replace the URI at the beginning of the scripts (uri) with the connection string provided by Atlas.

All scripts were tested locally on MongoDB Community Edition v6.0+.

Example Screenshot

Replace screenshot.png with a screenshot of MongoDB Compass or Atlas showing the books collection and some documents.



