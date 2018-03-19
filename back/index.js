// Basic imports
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
// Morgan permet de log les actions utilisateurs dans la console du serveur
// exemple access get sur /users, morgan affiche: "GET /users 200 2.874 ms - 1197"
import morgan from 'morgan'
// DotEnv permet d'utiliser un fichier de config .env (à la racine)
// on déclare des variables dedans puis on les utilise avec process.env.NOMDELAVARIABLE
import dotEnv from 'dotenv'

// Init .env
// Il faut absolement declarer la config de dotenv immediatement
// Pour que les process.env.VARIABLE soient utilisable depuis les imports (de routes)
dotEnv.config()

//  Routes imports
import auth from './routes/auth/auth'
import users from './routes/users/users'

// APP INIT
let app = express();

// Morgan
// A partir d'ici, toute les routes utilisent le middleware morgan
app.use(morgan('dev'))

// CORS
// A partir d'ici, toute les routes utilisent le middleware pour les cross-origin
// Cela permet d'accepter certaines requetes qui seraient autrement invalides car
// bloquées par le navigateur ou autre..
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');    
//   // intercept OPTIONS method
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   }
//   else {
//     next();
//   }
// })
app.use(cors())

// BODY PARSER
// A partir d'ici, toute les routes utilisent le middleware body-parser
// Qui permet de recuperer les données envoyés depuis le body d'une requete, req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// MONGOOSE MONGODB CONNECT
// Ne pas faire attention à mongoose.Promise
// Avec la methode CONNECT on etabli une connection vers la database mongodb grace à Mongoose
// Très simple d'utilisation pour le coup.
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGOURL, {}, function (err) {
  if (err) { throw err; } else {
    console.log('Connection to the Database etablished (' + process.env.MONGOURL + ')...');
  }
})

// AUTH ROUTE UNPROTECTED
// Les routes qui suivent sont libres d'accès
// Afin de pouvoir s'enregister / se loguer
app.use('/auth', auth)

// AUTH PROTECTION STARTS HERE...
// auth middleware definition
// Ici on défini le middleware qui va servir plus bas afin de vérifier que le token est valide
// On regarde donc si le header AUTHORIZATION existe, puis on separe en deux sa valeur
// la premiere partie est égale à un mot defini dans la config, et la seconde est égale au token.
// On utilise JWT.VERIFY(TOKEN, SECRETKEY, CALLBACK(err, result){...})
// JWT va donc verifier le token avec le secretkey et renvoyer via le callback une erreur ou un resultat
// Ce dernier correspond au token décodé, on retrouve le payload (ex: email utilisateur, id etc..)
// on appelle next(); pour dire que tout s'est bien passé et qu'on peut passer à la suite (circulez svp!)
let verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.AUTHBEARER) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, function (err, decode) {
      if (err) res.status(500).json({success: false, message: err})
      else {
        // le req.anas est un rajout pour avoir acces au token décodé sur d'autres routes
        // une fois qu'on a passé cette étape de verification
        req.milo = decode;
        next()
      }
    });
  } else {
    res.status(403).json({success: false, message: 'Unauthozired!'})
  }
};

// Use of auth middleware from there
// A partir d'ici on appelle donc pour toutes les routes qui suivent le middleware verifyToken créé plus haut
// Il verifiera à chaque fois si le token est valide avant d'authoriser l'acces à la suite sinon l'aventure s'arrête ici.
app.use(verifyToken)

// Protected routes
// Voici nos routes qui necessitent un token pour être accessibles.
// la route /users aura comme prefix /users et renvoi vers la routes du router 'users' importé au début.
app.use('/users', users)

// Fin des routes, on renvoi un 404 not found pour tout le reste
app.use('/*', (req, res) => {
  res.status(404).json({success: false, message: 'This route does not exists..'})
})

// LAUNCHING SERVER TO THE MOON
// On défini un port depuis le fichier de config .env  sinon si la variable n'existe pas on utilise le port 8080
let port = process.env.PORT || 1407;
app.listen(port, () => console.log('App listen on port: ' + port + ' ...'))