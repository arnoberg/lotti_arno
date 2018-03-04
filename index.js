/// START
var express = require('express');
var path = require('path')
var bodyParser= require('body-parser')
var favicon = require('express-favicon');
var sslRedirect = require('heroku-ssl-redirect');
var app = express();        
var port = process.env.PORT || 4000;
var firebaseURL = 'https://bruiloft-29cc3.firebaseio.com/';

app.use(bodyParser.urlencoded({extended: true}))
app.use(favicon(__dirname + '/public/img/favicon.ico'));


// enable ssl redirect
app.use(sslRedirect());

var url = "mongodb://localhost:27017/bruiloft";

const MongoClient = require('mongodb').MongoClient

var db
MongoClient.connect('mongodb://userlshtktns:hek7387@ds249128.mlab.com:49128/bruiloft', (err, client) => {
  if (err) return console.log(err)
  db = client.db('bruiloft')
  app.listen(port);
	console.log('Magic happens on port ' + port);

})
app.use('/public', express.static(path.join(__dirname + "/public")));
app.use('/vendor', express.static(path.join(__dirname + "/vendor")));

//app.use(favicon(__dirname + '/public/img/favicon.ico'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/thankyou.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/thankyou.html'));
});

app.post('/contact', (req, res) => {
	db.collection('contact').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/thankyou.html')
	})
})


