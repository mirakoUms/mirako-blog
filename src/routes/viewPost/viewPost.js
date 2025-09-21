const express = require('express');
const viewPostController = require('../../controllers/viewPost/viewPostController');

const router = express.Router();

router.get('/count', viewPostController.getPostCount);
router.get('/all', viewPostController.getAllPosts);
router.get('/', viewPostController.getPaginatedPosts);
router.get('/:id', viewPostController.getPostById);

module.exports = router;