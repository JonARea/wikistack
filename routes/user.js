const express = require('express');
const router = express.Router();
const wikiDB = require('../models');

module.exports = router;

router.get('/', (req, res) => {
    wikiDB.User.findAll()
        .then(users => res.render('index', {
            page: users
        }))
})