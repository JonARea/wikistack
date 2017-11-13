const express = require('express');
const router = express.Router();
const wiki = require('./wiki');
const user = require('./user');


router.use('/wiki/', wiki);
router.use('/user/', user);
modules.exports = router;