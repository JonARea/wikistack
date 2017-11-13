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

    //res.json(req.body)
    wikiDB.Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    })
    .then(data => res.redirect('/wiki'))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/add', (req, res) => {
    res.render('addpage')
})

router.get('/:urlTitle', (req, res) => {
  let urlTitle = req.params.urlTitle
  wikiDB.Page.findOne({
    where: {
      urlTitle: urlTitle
    }
  })
  .then(page => res.render('wikipage', {page: page}))
})

module.exports = router;
