---
title: "deal service REST API"

service use basicAuth

POST /register - public

expects:  JSON
{
   "username" : "some username"
    "password": "myStrongPassword"
}
-will create new user

GET /login   - basic authorization expected

GET /users  -private
will return array of existing usernames
