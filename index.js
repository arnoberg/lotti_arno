/// START
var express = require('express');
var path = require('path')
var app = express();        
var port = process.env.PORT || 4000;


app.use('/public', express.static(path.join(__dirname + "/public")));
app.use('/vendor', express.static(path.join(__dirname + "/vendor")));


//deze kan je veranderen in savethedate.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(port);
console.log('Magic happens on port ' + port);