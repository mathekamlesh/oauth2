var bodyParser = require('body-parser');
var express = require('express');
var OAuthServer = require('express-oauth-server');
 
var app = express();
 
app.oauth = new OAuthServer({
  model: require('./model')
});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.oauth.token());
 
app.use(function(req, res) {
  res.send('Secret area');
});
 
app.listen(3000);