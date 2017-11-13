const express = require('express');
const router = express.Router();
const wikiDB = require('../models');

module.exports = router;

router.get('/', (req, res) => {
    wikiDB.User.findAll()
        .then(users => res.render('users', {
            users: users
        }))
})

router.get('/:userId', (req, res) => {
    const user = wikiDB.User.findById(req.params.userId)
    const pages = wikiDB.Page.findAll({
        where: {
            authorId: req.params.userId
        }
    })
    Promise.all([user, pages])
    .then(values => {
        let user = values[0]
        let pages = values[1]
        user.pages = pages
        res.render('userPage', {user: user})
    })
})
