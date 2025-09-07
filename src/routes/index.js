const express = require('express');
const test = require('./test/test');

const router = express.Router();

router.use('/test', test)

module.exports = router;