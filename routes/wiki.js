const express = require('express');
const router = express.Router();
const wikiDB = require('../models')

router.get('/', (req, res) => {
    wikiDB.Page.findAll()
        .then(pages => res.render('index', {
            pages: pages
        }))
})

router.post('/', (req, res) => {

    //res.json(req.body);
    wikiDB.Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,

    });
});

router.get('/add', (req, res) => {
    res.render('addpage')
})

module.exports = router;