const SubCategory = require('../models/subcategory')


const express = require("express")

const route = express.Router()

route.post('/subcategories', async (req, res) => {
    try {
      const { subcategoryName, parentCategory } = req.body;
  
      // Create a new Subcategory instance
      const newSubcategory = new SubCategory({
        subcategoryName,
        parentCategory, // Assuming 'parentCategory' is the ID of the parent Category
      });
  
      // Save the new Subcategory to the database
      const savedSubcategory = await newSubcategory.save();
  
      res.status(201).json(savedSubcategory);
    } catch (error) {
      console.error('Error creating Subcategory:', error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });

  

  module.exports = route