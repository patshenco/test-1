const Category = require('../models/category')

const express = require("express")

const route = express.Router()

route.post('/categories', async (req, res) => {
    try {
      const { categoryName } = req.body;
  
      // Check if the category name already exists
      const existingCategory = await Category.findOne({ categoryName });
  
      if (existingCategory) {
        return res.status(400).json({ status: 400, message: `The category '${categoryName}' already exists` });
      }
  
      // Create a new Category instance
      const newCategory = new Category({
        categoryName,
      });
  
      // Save the new Category to the database
      const savedCategory = await newCategory.save();
  
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error('Error creating Category:', error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });
  


  

  module.exports = route