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
    wikiDB.User.findOrCreate({
            where: {
                name: req.body.authorName,
                email: req.body.authorEmail
            }
        })
        //res.json(req.body);
        .then((user) => {
            //res.json(user);
        return wikiDB.Page.create({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
            })
        })
        .then(page => page.setAuthor(user[0]))
        .then(page => {
            if (!page) res.send('That page was not found')

            page.getAuthor()
            .then(author => {
                page.author = author
                return res.redirect(page.route)
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/wiki/add')
        })
});
router.get('/add', (req, res) => {
    res.render('addpage')
})
router.get("/:urlTitle", (req, res) => {
    let urlTitle = req.params.urlTitle
    wikiDB.Page.findOne({
            where: {
                urlTitle: urlTitle
            }
        })
        .then(page => {
            if (!page) res.send('That page was not found')

            page.getAuthor()
            .then(author => {
                page.author = author
                return res.render('wikipage', {page: page})
            })
        })
        .catch(err => res.send('There was an error'))
})

module.exports = router;
