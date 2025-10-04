const express = require('express');
const genreController = require('../../controllers/genre/genreController');
const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

router.get('/all', genreController.getAllgenre);
router.get('/:genreName', genreController.getPostBygenre);
router.post('/new-genre', authenticateToken, genreController.creategenre);

module.exports = router;