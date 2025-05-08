// server.js

import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import Joi from 'joi';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors package

import rateLimit from 'express-rate-limit';

// Limit: max 5 requests per 1 minute per IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: 'Too many AI requests. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,
});


mongoose.set('debug', true);

// Load environment variables
dotenv.config();
const app = express();

app.use(express.json());  // For parsing JSON in request bodies

// app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000","https://ecommerce.cameron-dietz.com", "https://ecommerce.cameron-dietz.com/"], // Only allow requests from this origin
};

app.use(cors(corsOptions));

//console.log(process.env.MONGO_URI);
// MongoDB connection
//mongoose.connect(process.env.MONGO_URI, { dbName: 'ecommerce-db' })
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

import ProductAttribute from './models/Product.js'

//const ProductAttribute = mongoose.model("ProductAttribute", ProductAttributeSchema);

// Read-only GET
app.get("/attributes/:productId", async (req, res) => {
    const attribute = await ProductAttribute.findOne({ product_id: req.params.productId });
    if (!attribute) return res.status(404).send("Not found");
    res.json(attribute);
  });
  
// Secure write endpoint (used by Django)
app.post("/attributes", async (req, res) => {
  const { product_id, category, attributes } = req.body;
  if (req.headers.authorization !== `Bearer ${process.env.SECRET_API_TOKEN}`) {
    console.log("Unauthorized attempt to update part");
    return res.status(403).send("Forbidden");
  }
  await ProductAttribute.findOneAndUpdate(
    { product_id },
    { product_id, category, attributes },
    { upsert: true }
  );
  console.log("part updated");
  res.send("Updated");
});

//AI LOGIC

app.post('/api/ai-solution', aiLimiter, async (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { query } = req.body;

  try {
      // Call OpenAI API with user input
      const solution = await callOpenAI(query);
      
      // Extract relevant solution from the AI response
      //const solution = aiResponse.choices[0].text.trim();

      // Search for matching products based on AI response
      //const products = await searchMatchingProducts(solution);

      // Send back the response to the client
      return res.json({solution});
      //return res.json({ solution, products });
  } catch (error) {
      console.error('Error during request processing:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Validate incoming user input using Joi
function validateRequest(data) {
  const schema = Joi.object({
      query: Joi.string().min(5).required()  // Ensure user input is at least 5 characters
  });
  return schema.validate(data);
}

// Call OpenAI's API to get a solution based on user input
import OpenAI from "openai";
const client = new OpenAI();
async function callOpenAI(userInputJson) {
  console.log(userInputJson);
  try{
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',  // Replace with the model you prefer (GPT-3.5 or GPT-4)
      max_tokens: 100,
      messages: [
        {
          role: "system",
          content: `You are an expert assistant in industrial distribution, automation and networking. Only provide advice related to selecting products and diagnosing problems. Do it in no more than 50 words`,
        },
        {
            role: "user",
            content: userInputJson,
        },
      ],
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message.content;
  } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to get AI response');
  }
}

// Search for matching products in the MongoDB database based on AI's response
async function searchMatchingProducts(solution) {
  try {
      const searchTerms = solution.split(' ').map(term => new RegExp(term, 'i')); // Convert solution to search terms

      const products = await ProductAttribute.find({
          $or: [
              { description: { $in: searchTerms } },
              { name: { $in: searchTerms } },
              { features: { $in: searchTerms } },
              { category: { $in: searchTerms } },
          ],
          inStock: true,  // Optionally filter for in-stock items only
      }).limit(10);  // Limit results to 10 matching products

      return products;
  } catch (error) {
      console.error('Error searching products in DB:', error);
      throw new Error('Failed to search products');
  }
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
/*
// Import the Product model
const Product = require('./models/Product');

// API endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();  // Get all products from the DB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// API endpoint to get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// API endpoint to create a new product
app.post('/api/products', async (req, res) => {
    const { name, description, price, specs, category, stock, imageUrl } = req.body;
    
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        specs,
        category,
        stock,
        imageUrl
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: 'Error creating product', error: err });
    }
  });

  // API endpoint to update product details
app.put('/api/products/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });

  // API endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  
  
  
// Port and server listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
*/