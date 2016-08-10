## SAMPLE Auth0 
This sample project demonstrates using both an SPA and Non-Interactive client with an API Backend


### API
The api backend is ran via:
`node server/server.js`

### Non-Interactive Client
This simulates a daemon, cron-job, or other utility. It can be ran from:
`node non-interactive/tool.js`

### SPA
This is a Single Page App that allows end users to log in and call an `/api/users` endpoint in the API.
SPA can be accessed at `http://localhost:4000/index.html`


### Setup in Auth0
1. Create API
  - Set the Identifier to `my-api`
2. Create SPA Client
3. Create Non-Interactive Client
  - Authorize it for the API
  - Specify callback url
