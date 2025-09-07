const express = require('express');
const viewPostController = require('../../controllers/viewPost/viewPostController');

const router = express.Router();

/**
 * View Post
 * @description Routes for viewing posts
 * @route GET api/posts/all
 * @author Mirako
 * @date 2025-07-09
 */
router.get('/all', viewPostController.getAllPosts);

module.exports = router;