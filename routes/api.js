const express = require('express');
const categories = require('./categories')
const Subcategories = require('./subcategories')
const apiRoute = express.Router()

apiRoute.use('/categories', categories)
apiRoute.use('/subcategories', Subcategories)

module.exports = apiRoute 