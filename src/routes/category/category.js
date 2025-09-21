const express = require('express');
const categoryController = require('../../controllers/category/categoryController');
const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

router.get('/all', categoryController.getAllCategory);
router.get('/:categoryName', categoryController.getPostByCategory);
router.post('/new-category', authenticateToken, categoryController.createCategory);

module.exports = router;