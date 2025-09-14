const express = require('express');
const authenticateToken = require("../../middlewares/authenticateToken");
const changePostController = require('../../controllers/changePost/changePostController');

const router = express.Router();

router.post('/new', authenticateToken, changePostController.createPost);
router.delete('/delete/:id', authenticateToken, changePostController.deletePost);
router.patch('/edit-info-part/:id', authenticateToken, changePostController.editInfo);
router.patch('/save/:id', authenticateToken, changePostController.save);

module.exports = router