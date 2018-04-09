DON'T FORGET TO DO: 'cp env-example .env'  
ALSO 'node seeder/admin.babel.js'  
To create the first admin,  which credentials are admin:admin

# ROUTES:

    RESPONSE FORMAT:
      success: Boolean (true or false),
      message: String,
      content (optional): direct content or object with different keys

* POST /auth/login
  >get a token

      body:
        email
        password

## -- Below routes require:

        header:
          Authorization: token

* GET /profile
  >get your own profile  

* PUT /profile
  >update your own profile  

      body:
        any infromations you want to update,
        if 'email' you need to provide 'oldEmail' too
        if 'password' you need to provide 'oldPassword' too
        

* GET /users
  >get the list of all users  

* POST /users
  >register a new user  

      body:
        email
        password

* GET /users/:id
  >get a user profile with his id (admin)  


* PUT /users/:id
  >update a user profile with his id (admin)  

      body:
        email
        password
        ++etc...

* DELETE /users/:id
  >delete a user (admin)  