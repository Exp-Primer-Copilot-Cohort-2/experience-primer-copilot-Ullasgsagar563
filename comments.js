// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Connect to MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'commentdb';
let db;
(async () => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
})();

// Serve static files
app.use(express.static('public'));

// Parse incoming request bodies
app.use(bodyParser.json());

// GET /comments
app.get('/comments', async (req, res) => {
  const comments = await db.collection('comments').find().toArray();
  res.json(comments);
});

// POST /comments
app.post('/comments', async (req, res) => {
  const comment = req.body;
  await db.collection('comments').insertOne(comment);
  res.status(201).send();
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});