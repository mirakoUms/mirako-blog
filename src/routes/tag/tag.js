const express = require('express');
const authenticateToken = require('../../middlewares/authenticateToken');
const tagController = require('../../controllers/tag/tagController');

const router = express();

router.get('/all', tagController.getAllTags);
router.get('/:tagId', tagController.getPostByTag);
router.post('/new-tag', authenticateToken, tagController.createTag);

module.exports = router;