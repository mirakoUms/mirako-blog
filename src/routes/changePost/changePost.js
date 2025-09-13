const express = require('express');
const authenticateToken = require("../../middlewares/authenticateToken");
const changePostController = require('../../controllers/changePost/changePostController');

const router = express.Router();

router.post('/new', authenticateToken, changePostController.createPost);
router.delete('/delete/:id', changePostController.deletePost);
// router.put('/edit-info-part/:id', changePostController.editPostInfoPart);
// router.patch('/save/:id', changePostController.savePost);

module.exports = router