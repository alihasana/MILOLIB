# MILOLIB

An awesome app with VueJs and some other stuff \o/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
MongoDB (https://www.mongodb.com/en)
Nodemon (optional) (https://nodemon.io/) 
```

### Installing

A step by step series of examples that tell you have to get a development env running

Get the project (lol) :

```
Clone or download it ! (because it's better with the repo)
```

Open terminal (if it's not the case)

```
Access to : 
- MILOLIB/back 
- MILOLIB/front
- MILOLIB/front_client
```
Install dependencies :

```
Make 'npm install' in three path !
```
Setup environnement (MILOLIB/back) :

```
Copy the "example.env" file, paste in the same path (MILOLIB/back) and rename it into ".env". 
(or just rename the "example.env" into ".env")
Then setup it if you want to use a custom environnement.
```
Setup seeder (MILOLIB/back) :

```
In terminal make :
- "node seeder/babel/allStaff.babel.js" or "npm run s_staff"
- "node seeder/babel/clients.babel.js" or "npm run s_client"

Then check if the datas are in your database :
- milolib->collection->users (5 entries) 
- milolib->collection->clients (3 entries))

Notes Staff Seeder : 
Email : admin-conseiller Password : admin-conseiller
Email : conseiller Password : conseiller
Email : invité Password : invité
Email : admin Password : admin
Email : accueil Password : accueil

Notes Client Seeder : 
Email : client Password : client
Email : a@a Password : a
Email : z@z Password : a
```
Finally go back to your terminal and write :

``` 
- MILOLIB/back : "npm start"
- MILOLIB/front : "npm run dev" or "npm start"
- MILOLIB/front_client : "npm run dev" or "npm start"
```
Go to your localhost (default port on 8080) :

```
http://localhost:8080/ (first npm run dev [front])
http://localhost:8081/ (second npm run dev [front_client])
```
Enjoy : 

```
Send donation ! it's free for us ୧$◡$୨ ! #giveMeMoney
```

<!-- End with an example of getting some data out of the system or using it for a little demo -->

## Running the tests (╯■ᗝ■）╯︵ ┻━┻

<!-- Explain how to run the automated tests for this system -->
... 

### Break down into end to end tests

<!-- Explain what these tests test and why -->

```
...
```

### And coding style tests

<!-- Explain what these tests test and why -->

```
...
```

## Deployment

<!-- Add additional notes about how to deploy this on a live system -->
...

## Built With

Backend :

* [Body-Parser](https://www.npmjs.com/package/body-parser-json) - Used to parse data
* [Express](http://expressjs.com/) - The Node's web framework used
* [Jsonwebtoken](https://jwt.io/) - Used to generate token
* [Mongoose](http://mongoosejs.com/) Used between our Node.js server and our MongoDB server

Frontend :

* [Axios](https://github.com/axios/axios) - Used to make promise based HTTP client for the browser and node.js 
* [Bootstrap-vue](https://bootstrap-vue.js.org/) - Used to style and make a responsive design with Vue.js
* [Sweetalert2](https://sweetalert2.github.io/) - Used to make sweet alert ~
* [Vue](https://fr.vuejs.org/index.html) - The web framework used
* [Vue-router](https://github.com/vuejs/vue-router) - Used to create Vue.js routes
* [Vuex](https://github.com/vuejs/vuex) - Centralized State Management for Vue.js

## Contributing

<!-- Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

You can contribute for 5$/day (ง$Ѡ$)ง

## Versioning

<!-- We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).  -->

No versioning for the moment ...

## Authors

* **Sandrine Pradier** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

* **Asma El Kabir** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

* **Yoann Roule** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

* **Luke Perrey** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

* **Alihasana Shaik Alauddeen** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

* **Loïc Aublet** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

* **Kévin Beauguet** <!-- - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth) -->

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

## License

<!-- This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->

This project is licensed under the Moulinex License (∩⏒ ³⏒)⊃━☆ﾟ.* - see google for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
