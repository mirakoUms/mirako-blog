const express = require('express');
const test = require('./test/test');
const auth = require('./user/auth');
const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);

module.exports = router;