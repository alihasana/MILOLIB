ROUTES POSTMAN:

POST http://localhost:1407/auth/login
  ->get a token

        body: email
        password
        
POST http://localhost:1407/auth/register
  ->register a new user

        body: email
        password

-- Below routes require

        header: Authorization: token

GET http://localhost:1407/users
  ->get the list of all users




DON'T FORGET TO DO: 'cp env-example .env'