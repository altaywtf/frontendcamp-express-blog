
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const db = require('./db')

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// Post Listing Page
app.get('/', function (req, res) {
  res.render('index.html', { posts: db })
})

// Post Detail Page
app.get('/:id', function (req, res) {
  const id = req.params.id

  const post = db.find(function (item) {
    return item.id == id
  })

  if (post) {
    res.render('detail.html', { post: post })
  } else {
    res.send('Unable to find post with id=' + id)
  }
})

app.listen(3000, function() {
  console.log('Express Blog is started at localhost:3000')
})

