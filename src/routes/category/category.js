const express = require('express');
const catchategoryController = require('../../controllers/category/categoryController');

const router = express.Router();


router.get('/:categoryName', catchategoryController.getPostByCategory);

module.exports = router;