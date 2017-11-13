const express = require('express');
const router = express.Router();
const wiki = require('./wiki');
const user = require('./user');
const wikiDB = require('../models');

router.use('/wiki/', wiki);
router.use('/users/', user);
router.get('/', (req, res) => {
    wikiDB.Page.findAll()
        .then(pages => res.render('index', {
            pages: pages
        }))
})
module.exports = router;