// server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB Connection URI
const dbURI = 'mongodb://localhost:27017/ecommerce-db'; // Change this if using a different address

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Simple Test Route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB is connected and server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
