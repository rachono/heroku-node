var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var apiai = require('apiai');
var apiapp = apiai("84527bc933c5464d963981e32fd16721");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.post('/chat', function(req, res){
  console.log(req.body.chatText);
  var request = apiapp.textRequest(req.body.chatText, {
    sessionId: '123123'
  });
  request.on('response', function(response) {
      console.log(response);
      res.send(response);
  });
  request.on('error', function(error) {
      console.log(error);
      res.send(error);
  });
  request.end();
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});