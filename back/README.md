ROUTES POSTMAN:

POST http://localhost:1407/auth/login
  ->get a token

        body:
        email
        password
        

-- Below routes require

        header: Authorization: token

GET http://localhost:1407/users
  ->get the list of all users

POST http://localhost:1407/users
  ->register a new user

        body:
        email
        password

GET http://localhost:1407/users/self
  ->get your own profile

PATCH http://localhost:1407/users/self
  ->update your own profile

        body:
        email
        password
        ++etc...

GET http://localhost:1407/users/:id
  ->get a user profile with his id (admin)


PATCH http://localhost:1407/users/:id
  ->update a user profile with his id (admin)

        body:
        email
        password
        ++etc...

DELETE http://localhost:1407/users/:id
  ->delete a user (admin)

DON'T FORGET TO DO: 'cp env-example .env'