'use strict'
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var router = express.Router()
var path = require('path')
var jwt = require('express-jwt')
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var AUTH0_DOMAIN = 'YOURTENANT.auth0.com'


var jwtCheck = jwt({
  secret: rsaValidation(),
  algorithms: ['RS256'],
  issuer: 'https://' + AUTH0_DOMAIN + '/',
  audience: 'my-api'
});

var app = express()
app.options('*', cors());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PATCH')
  res.setHeader('Access-Control-Allow-Origin', '*') 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// serve our static stuff 
app.use(express.static(path.join(__dirname, 'public')))

// Verify Authorization header's Bearer token
app.use(jwtCheck);

// Below this point, everything is protected
app.get('/api/users', function (req, res) {
  var users = [{name: 'John'}, {name: 'Mike'}]
  res.send(users);
});


app.use(function (err, req, res, next) {
  return res.status(500).send({name:err.name, message: err.message});
});


var PORT = process.env.PORT || 4000
app.listen(PORT, function() {
  console.log('Server running at localhost:' + PORT)
})
