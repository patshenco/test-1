
const CategoryRoute = require('./routes/categories')
const subCategoryRoute = require('./routes/subcategories')
require('./config/db')
const apiRoute = require('./routes/api')


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/v1' , apiRoute)


// Route to create a new product

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
