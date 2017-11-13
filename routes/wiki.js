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
            wikiDB.Page.create({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                authorId: user[0].id

            }).then(page => res.redirect('/wiki/' + page.urlTitle))
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
        .then(page => res.render("wikipage", {
            page: page
        }))
})



module.exports = router;