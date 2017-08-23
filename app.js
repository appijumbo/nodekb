/*jshint esversion: 6 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mongoose = require('mongoose');

// Connecting monggose to the router
mongoose.connect('mongodb://localhost/nodekb');

// to simplify the mongoose.connection syntax
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to mongodb');
});


// Check for db errors
db.on('error', function(err){
  console.log(err);
});

// Init app
const app = express();

/*
hbs.localsAsTemplateData(app);
app.locals.articles = {
*/

const port = process.env.PORT || 3000;

//Load view engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Home route
app.get('/', (req, res) => {

  let articles = [
    {
      'id': 1,
      'title': 'Aricle One',
      'author': 'Tom O',
      'body': 'one one one'
    },
    {
      'id': 2,
      'title': 'Aricle Two',
      'author': 'Sarah Jane',
      'body': 'two two two'
    },
    {
      'id': 3,
      'title': 'Aricle Three',
      'author': 'Peter Smith',
      'body': 'three three three'
    }
  ];

   res.render('index.hbs', {
     pageTitle: 'Articles',
     message: 'heres the root page',
     articles: articles
   });
});


// Article page
app.get('/article/add', (req, res) => {
   res.render('article.hbs', {
     pageTitle: 'Article',
     message: 'why not add some articles'
   });
});


// Start server
app.listen(port, () => {
  console.log(`Sever on port ${port} is ok`);
});
