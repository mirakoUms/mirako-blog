const express = require('express');
const viewPostController = require('../../controllers/viewPost/viewPostController');

const router = express.Router();

router.get('/count', viewPostController.getPostCount);
router.get('/all', viewPostController.getAllPosts);
router.get('/', viewPostController.getPaginatedPosts);
router.get('/:id', viewPostController.getPostById);
router.get('/check-if-exists/:id', viewPostController.checkIfPostExists);

module.exports = router;