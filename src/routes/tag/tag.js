const express = require('express');
const tagController = require('../../controllers/tag/tagController');

const router = express();

router.get('/all', tagController.getAllPostsByTag);
router.get('/:tagName', tagController.getPostByTag);

module.exports = router;