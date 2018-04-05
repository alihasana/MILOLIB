# ROUTES:

    RESPONSE FORMAT:  
      success: Boolean (true or false),  
      message: String,  
      content (optional): direct content or object with different keys  

* POST http://localhost:1407/auth/login
  >get a token

      body:
        email
        password

## -- Below routes require:

        header:
          Authorization: token

* GET http://localhost:1407/profile
  >get your own profile  

* PUT http://localhost:1407/profile
  >update your own profile  

      body:
        email
        oldPassword
        password
        ++etc...  

* GET http://localhost:1407/users
  >get the list of all users  

* POST http://localhost:1407/users
  >register a new user  

      body:
        email
        password

* GET http://localhost:1407/users/:id
  >get a user profile with his id (admin)  


* PUT http://localhost:1407/users/:id
  >update a user profile with his id (admin)  

      body:
        email
        password
        ++etc...

* DELETE http://localhost:1407/users/:id
  >delete a user (admin)  

DON'T FORGET TO DO: 'cp env-example .env'  
ALSO 'node seeder/admin.babel.js'  
To create the first admin,  which credentials are admin:admin