var request = require('superagent')

var NON_INTERACTIVE_CLIENT_ID = ''
var NON_INTERACTIVE_CLIENT_SECRET = ''

var authData = {
  client_id: NON_INTERACTIVE_CLIENT_ID,
  client_secret: NON_INTERACTIVE_CLIENT_SECRET,
  grant_type: 'client_credentials',
  audience: 'my-api'
}

// First, authenticate this client and get an access_token
// This could be cached
request
  .post('https://alex-api-sample.auth0.com/oauth/token')
  .send(authData)
  .end(function(err, res) {
    var token = res.body.access_token

    // Call API 
    callMyAPI(token)
  })


function callMyAPI(token){
  request
    .get('http://localhost:4000/api/users')
    .set('Authorization', 'Bearer ' + token)
    .end(function(err, res) {
      users = res.body
      console.log(users)
    })
}


