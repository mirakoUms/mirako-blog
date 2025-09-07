const express = require('express');
const test = require('./test/test');
const auth = require('./user/auth');
const profile = require('./user/profile');
const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/me', profile);

module.exports = router;