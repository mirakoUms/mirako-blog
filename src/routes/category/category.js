const express = require('express');
const categoryController = require('../../controllers/category/categoryController');

const router = express.Router();

router.get('/all', categoryController.getAllCategory);
router.get('/:categoryName', categoryController.getPostByCategory);

module.exports = router;