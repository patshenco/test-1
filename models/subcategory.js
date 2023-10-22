const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
  subcategoryName: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
  
 module.exports = mongoose.model('SubCategory', subCategorySchema);