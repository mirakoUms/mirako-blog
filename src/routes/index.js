const express = require('express');
const test = require('./test/test');
const auth = require('./user/auth');
const profile = require('./user/profile');
const viewPost = require('./viewPost/viewPost');
const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/me', profile);
router.use('/posts', viewPost);

module.exports = router;