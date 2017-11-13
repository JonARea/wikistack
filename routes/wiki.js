const express = require('express');
const router = express.Router();
const wikiDB = require('../models')

router.get('/',  (req, res) => {
  wikiDB.Page.findAll()
  .then(pages => res.render('index', {pages: pages}))
})

router.post('/', (req, res) => {
  wikiDB.Page.create({

  })
})

router.get('/add', (req, res) => {
  res.render('addpage')
})

module.exports = router;
