const Category = require("../models/category");
const Subcategory = require("../models/subcategory");
const mongoose = require('mongoose');

// Create a new Category 
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Check if the category name already exists
    const existingCategory = await Category.findOne({ categoryName });

    if (existingCategory) {
      return res.status(400).json({
        status: 400,
        message: `The category '${categoryName}' already exists`,
      });
    }

    // Create a new Category instance
    const newCategory = new Category({
      categoryName,
    });

    // Save the new Category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
// Listing all the categories.
const allCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    const totalCategories = await Category.countDocuments(); // Get the total number of categories

    // Check if there are no categories
    if (categories.length === 0) {
      return res
        .status(200)
        .json({ status: 200, data: [], total: totalCategories, page });
    }

    res.status(200)
      .json({ status: 200, data: categories, total: totalCategories, page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
// Searching for categories.
const searchCategory =  async (req, res) => {
  try {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find({
      categoryName: { $regex: query, $options: "i" },
    })
      .skip(skip)
      .limit(limit);

    // Check if there are no categories
    if (categories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    const totalCategories = await Category.countDocuments({
      categoryName: { $regex: query, $options: "i" },
    });
    res.status(200).json({
      status: 200,
      data: categories,
      total: totalCategories,
      page: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Getting a category by ID.
const CategoryById =async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }

    res.status(200).json({ status: 200, data: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Updating the category data.

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categoryName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid category ID",
      });
    }

    // Check if the category name already exists, excluding the current category being updated
    const existingCategory = await Category.findOne({
      categoryName,
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      return res.status(400).json({
        status: 400,
        message: `The category '${categoryName}' already exists`,
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }

    // Update the category data
    category.categoryName = categoryName;

    // Save the updated category to the database
    const updatedCategory = await category.save();

    res.status(200).json({ status: 200, data: updatedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Deleting a category.

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid category ID",
      });
    }

    // Check if the category has any associated subcategories
    const subcategories = await Subcategory.find({
      parentCategory: categoryId,
    });

    if (subcategories.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Cannot delete a category with associated subcategories",
      });
    }

    const result = await Category.deleteOne({ _id: categoryId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};



module.exports = { createCategory, allCategory ,searchCategory , CategoryById , updateCategory , deleteCategory};
