import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../../helpers/helper'
import User from './../users/model'

let router = express.Router()


router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, function (err, user) {
    console.log("One",req.body.email )
    console.log("Two",req.body.password )
      if (err) res.status(500).json({ success: false, message: err.message })
      if (!user) {
        res.status(401).json({ success: false, message: 'User not found.' })
      } else if (user) {
        if (!user.comparePasswords(req.body.password)) {
          res.status(401).json({ success: false, message: 'Wrong password.' })
        } else {
          // JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...})
          jwt.sign({ email: user.email, _id: user._id }, process.env.SECRETKEY, function (err, result) {
            if (err) {
              res.status(500).json({ success: false, message: err.message })
            } else {
              res.status(200).json({ success: true, message: 'Welcome !', content: { token: process.env.AUTHBEARER + ' ' + result } })
            }
          })
        }
      }
    })
  } else {
    res.status(412).json({ success: false, message: 'email and/or password are missing.' })
  }
})

// router.post('/signup', (req, res) => {
//   if (req.body.email && req.body.password) {
//     if (helper.regexEmail.test(req.body.email)) {
//       User.findOne({ email: helper.caseInsensitive(req.body.email) }, function (err, result) {
//         if (result === null) {
//           let newUser = new User(req.body)
//           newUser.hashPassword = bcrypt.hashSync(req.body.password, 10)
//           newUser.save(function (err, user) {
//             if (err) res.status(500).json({ success: false, message: err.message })
//             else {
//               helper.beforeSendUser(user)
//               res.status(200).json({ success: true, message: 'New user registered successfully!', content: user })
//             }
//           })
//         } else res.status(412).json({ success: false, message: 'email already used.' })
//       })
//     } else res.status(412).json({ success: false, message: 'Email required.' })
//   } else res.status(412).json({ success: false, message: 'Email and/or password are missing.' })
// })

export default router