import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './../models/User'
import Token from './../models/Token'

let auth = express.Router()

auth.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).json({ message: 'Authentication failed. User not found.' })
      } else if (user) {
        if (!user.comparePasswords(req.body.password)) {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' })
        } else {
          jwt.sign({ email: user.email, _id: user._id }, process.env.SECRETKEY, function (err, result) {
            let newToken = new Token({token: result});
            newToken.save(function (err, user) {
              if (err) {
                return res.status(400).send({ message: err })
              } else {
                return res.json({ token: result })
              }
            })
          })
        }
      }
    })
  } else {
    res.status(412).send({ message: 'email and/or password are mising' })
  }
})
  
auth.post('/register', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email}, function (err, result) {
      if (result === null) {
        let newUser = new User(req.body)
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
        newUser.save(function (err, user) {
          if (err) {
            return res.status(400).send({ message: err })
          } else {
            user.hash_password = undefined
            return res.json(user)
          }
          })
      } else {
        res.status(412).send({message: "email already used"})
      }
    })
  } else {
    res.status(412).send({ message: 'email and/or password are mising' })
  }
})

export default auth