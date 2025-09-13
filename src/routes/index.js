const express = require('express');
const test = require('./test/test');
const auth = require('./user/auth');
const profile = require('./user/profile');
const viewPost = require('./viewPost/viewPost');
const changePost = require('./changePost/changePost');
const category = require('./category/category')
const tag = require('./tag/tag')
const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/me', profile);
router.use('/posts', viewPost);
router.use('/edit-posts', changePost);
router.use('/category', category);
router.use('/tag', tag);
module.exports = router;