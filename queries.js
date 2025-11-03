// queries.js - MongoDB queries for plp_bookstore

// Connect to MongoDB
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const books = db.collection('books');

    // ===============================
    // TASK 2: Basic CRUD Operations
    // ===============================

    // 1. Find all books of a specific genre
    const fictionBooks = await books.find({ genre: 'Fiction' }).toArray();
    console.log('Fiction books:', fictionBooks);

    // 2. Find books published after 1950
    const booksAfter1950 = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log('Books published after 1950:', booksAfter1950);

    // 3. Find books by a specific author
    const orwellBooks = await books.find({ author: 'George Orwell' }).toArray();
    console.log('Books by George Orwell:', orwellBooks);

    // 4. Update the price of a specific book
    await books.updateOne(
      { title: 'The Hobbit' },
      { $set: { price: 16.99 } }
    );
    console.log('Price of "The Hobbit" updated');

    // 5. Delete a book by title
    await books.deleteOne({ title: 'Moby Dick' });
    console.log('"Moby Dick" deleted');

    // ===============================
    // TASK 3: Advanced Queries
    // ===============================

    // 1. Find books in stock and published after 2010
    const recentInStock = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log('Books in stock and published after 2010:', recentInStock);

    // 2. Projection: return only title, author, and price
    const projectedBooks = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log('Books with projection (title, author, price):', projectedBooks);

    // 3. Sort books by price ascending
    const sortedAsc = await books.find({}).sort({ price: 1 }).toArray();
    console.log('Books sorted by price (asc):', sortedAsc);

    // 4. Sort books by price descending
    const sortedDesc = await books.find({}).sort({ price: -1 }).toArray();
    console.log('Books sorted by price (desc):', sortedDesc);

    // 5. Pagination: 5 books per page
    const page1 = await books.find({}).skip(0).limit(5).toArray();
    const page2 = await books.find({}).skip(5).limit(5).toArray();
    console.log('Page 1 (5 books):', page1);
    console.log('Page 2 (5 books):', page2);

    // ===============================
    // TASK 4: Aggregation Pipeline
    // ===============================

    // 1. Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray();
    console.log('Average price by genre:', avgPriceByGenre);

    // 2. Author with the most books in the collection
    const topAuthor = await books.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('Author with the most books:', topAuthor);

    // 3. Group books by decade of publication
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: {
            $concat: [
              { $substr: [{ $subtract: ['$published_year', { $mod: ['$published_year', 10] }] }, 0, -1] },
              's'
            ]
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('Books grouped by decade:', booksByDecade);

    // ===============================
    // TASK 5: Indexing
    // ===============================

    // 1. Create an index on title
    await books.createIndex({ title: 1 });
    console.log('Index created on "title"');

    // 2. Create a compound index on author and published_year
    await books.createIndex({ author: 1, published_year: 1 });
    console.log('Compound index created on "author" and "published_year"');

    // 3. Demonstrate performance improvement with explain()
    const explainResult = await books.find({ author: 'George Orwell' }).explain();
    console.log('Explain result for query by author "George Orwell":', explainResult);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

runQueries();
