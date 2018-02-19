/// START
var express = require('express');
var path = require('path')
var bodyParser= require('body-parser')
var app = express();        
var port = process.env.PORT || 4000;
var firebaseURL = 'https://bruiloft-29cc3.firebaseio.com/';


app.use(bodyParser.urlencoded({extended: true}))

var url = "mongodb://localhost:27017/bruiloft";

const MongoClient = require('mongodb').MongoClient

var db
MongoClient.connect('mongodb://arno:bergvanden@ds141028.mlab.com:41028/bruiloft', (err, client) => {
  if (err) return console.log(err)
  db = client.db('bruiloft')
  app.listen(port);
	console.log('Magic happens on port ' + port);

})
app.use('/public', express.static(path.join(__dirname + "/public")));
app.use('/vendor', express.static(path.join(__dirname + "/vendor")));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/contact', (req, res) => {
	db.collection('contact').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
	})
})


