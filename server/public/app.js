var AUTH0_CLIENT_ID = 'SPA_CLIENT_ID'
var AUTH0_DOMAIN = 'YOURTENANT.auth0.com'

var lockOptions = {
  auth: {
    params: {
      scope: 'openid',
      audience: 'my-api'
    }
  }
}
var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, lockOptions);

// We're manually getting the hash due to a temporary bug with Lock
if (window.location.hash) {
  var token = getHashValue('access_token');
  if (token) {
    localStorage.idToken = token
    showLoggedIn()
  }
}

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
document.getElementById('btn-view').addEventListener('click', function() {
  var token = localStorage.idToken
  window.location = 'https://jwt.io/?value=' + token
});
document.getElementById('btn-logout').addEventListener('click', function() {
  delete localStorage.idToken
  document.getElementById('login-box').style.display = 'inline';
  document.getElementById('logged-in-box').style.display = 'none';
});
document.getElementById('btn-api').addEventListener('click', function() {
  callAPI()
});

function callAPI() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("api-result").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "/api/users", true);
  var token = localStorage.idToken
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.send();
}

// Only needed due to Lock bug
function getHashValue(key) {
  var matches = window.location.hash.match(new RegExp(key + '=([^&]*)'));
  return matches ? matches[1] : null;
}


// Normally we'd use this to capture the returned login, 
// but there is a bug with Lock Which causes the error 
// you see in the console
//
// lock.on("authenticated", function(authResult) {
//   lock.getProfile(authResult.idToken, function(error, profile) {
//     if (error) {
//       console.log(error)
//       return;
//     }
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('profile', JSON.stringify(profile));
//     console.log(authResult.idToken)
//     console.log(profile)
//     showLoggedIn();
//   });
// });

// show Logged In when returning/reloading
if (localStorage.idToken) {
  showLoggedIn()
}

// Display the user's profile
function showLoggedIn() {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('logged-in-box').style.display = 'inline';
  // var profile = JSON.parse(localStorage.getItem('profile'));
  // document.getElementById('nick').textContent = profile.nickname;
}

