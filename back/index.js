import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
// DotEnv permet d'utiliser un fichier de config .env (à la racine)
// on déclare des variables dedans puis on les utilise avec process.env.NOMDELAVARIABLE
import dotEnv from 'dotenv'

// Init .env
// Il faut absolement declarer la config de dotenv immediatement
// Pour que les process.env.VARIABLE soient utilisable depuis les imports (de routes)
dotEnv.config()

//  Routes Imports
import auth from './routes/auth/auth'
import clientsAuth from './routes/clients/clientsAuth'
import clients from './routes/clients/clients'
import users from './routes/users/users'
import profile from './routes/profile/profile'
import calendar from './routes/calendar/calendar'
import usersCalendar from './routes/calendar/usersCalendar'
// Middleware Imports
import verifyToken from './middlewares/verifyToken'

// APP INIT
let app = express()

// Morgan
// A partir d'ici, toute les routes utilisent le middleware morgan
app.use(morgan('dev'))

// CORS
// A partir d'ici, toute les routes utilisent le middleware pour les cross-origin
// Cela permet d'accepter certaines requetes qui seraient autrement invalides car
// bloquées par le navigateur ou autre..
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // TODO: add to .env
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  res.header('Access-Control-Max-Age', '86400')
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) res.sendStatus(200)
  else next()
})

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ROUTER PREFIX API DEFINING (see below)
let router = express.Router()

// AUTH ROUTE UNPROTECTED
router.use('/auth', auth)
router.use('/clientsAuth', clientsAuth)

// AUTH PROTECTION STARTS HERE
// Il verifiera à chaque fois si le token est valide avant d'authoriser l'acces à la suite sinon l'aventure s'arrête ici.
router.use(verifyToken)

// Protected routes
router.use('/users', users)
router.use('/clients', clients)
router.use('/profile', profile)
router.use('/calendar', calendar)
router.use('/calendar', usersCalendar) // TODO : test

app.use(router)

// Fin des routes, on renvoi un 404 not found pour tout le reste
app.use('/*', (req, res) => {
  res
    .status(404)
    .json({ success: false, message: 'This route does not exists.' })
})

// MONGOOSE MONGODB CONNECT
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, {}, err => {
  if (err) {
    throw err
  } else {
    console.log('Connection to the Database established...')
    // LAUNCHING SERVER TO THE MOON
    // On défini un port depuis le fichier de config .env, si la variable n'existe pas on utilise le port 1408
    let port = process.env.PORT || 1408
    app.listen(port, () => console.log('App listens on port: ' + port))
    // app.listen(port, () => console.log('App listens on port: ' + port + '\u0007')) // With Sound
  }
})

  // TODO: virer les 'else' inutile qui englobent tout le code. 
  // Les remplacer par un 'return' dans la condition pour stopper l'execution.