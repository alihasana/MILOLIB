// Basic imports
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import dotEnv from 'dotenv'

// Init .env
dotEnv.config();

//  Routes imports
import auth from './auth/route'
import users from './users/route'

// APP INIT
let app = express();

// Morgan
app.use(morgan('dev'));

// CORS
app.use(function (req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

// BODY PARSER
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// MONGOOSE MONGODB CONNECT
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {}, function (err) {
  if (err) { throw err; } else {
    console.log('Connection to the Database etablished (' + process.env.DB + ')...');
  }
});

// AUTH ROUTE UNPROTECTED
app.use('/auth', auth);

// AUTH PROTECTION STARTS HERE...
// auth middleware definition
let verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.AUTHBEARER) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, function (err, decode) {
      if (err) throw err;
      else {
        console.log(decode);
        req.quezac = decode;
        next(); // il est partout !
      }
    });
  } else {
    res.status(403).json({'message': 'Unauthozired!'});
  }
};

// Use of auth middleware from there
app.use(verifyToken);

// Protected routes
app.use('/users', users);

// LAUNCHING SERVER TO THE MOON
let port = process.env.PORT || 8080;
app.listen(port, () => console.log('App listen on port: ' + port + ' , =D'));