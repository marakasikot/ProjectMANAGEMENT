const express = require('express');
const userApi = require('./api/userApi');

const router = express.Router();

router.use('/', userApi);

module.exports = router;
