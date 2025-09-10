const express = require('express');
const viewPostController = require('../../controllers/viewPost/viewPostController');

const router = express.Router();

/**
 * View Post
 * @description Routes for viewing posts
 * @route GET api/posts/all
 * @author Mirako
 * @date 2025-09-07
 */
router.get('/count', viewPostController.getPostCount);
router.get('/all', viewPostController.getAllPosts);
router.get('/', viewPostController.getPaginatedPosts);
router.get('/:id', viewPostController.getPostById);

module.exports = router;