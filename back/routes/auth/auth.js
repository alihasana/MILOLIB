import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../../helpers/helper'
import User from './../users/model'
let router = express.Router()

router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: helper.caseInsensitive(req.body.email) }, (err, user) => {
      console.log(user.active + ' : ' + typeof (user.active)) // si different de false ou 'false', true est renvoyé. wtf ? :=/
      if (err) res.status(500).json({ success: false, message: err.message })
      else if (!user) res.status(400).json({ success: false, message: 'Email and/or password incorrect.' })
      else if (user.active !== true) res.status(400).json({ success: false, message: 'Inactive account. Please contact an administrator.' }) // condition pas parfaite, elle n'est remplie que lorsque il y a false ou 'false'. Si active: 'uneStringAuPif' , ça passe :/.
      else {
        if (!user.comparePasswords(req.body.password)) {
          res.status(400).json({ success: false, message: 'Email and/or password incorrect.' })
        } else {
          // JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...})
          jwt.sign({ email: user.email, _id: user._id }, process.env.SECRETKEY, (err, result) => {
            if (err) res.status(500).json({ success: false, message: err.message })
            else res.status(200).json({ success: true, message: 'Welcome !', content: { token: process.env.AUTHBEARER + ' ' + result, user: user.role } })
          })
        }
      }
    })
  } else res.status(400).json({ success: false, message: 'Missing email and/or password.' })
})

router.post('/signup', (req, res) => {
  if (req.body.email && req.body.password) {
    if (helper.regexEmail.test(req.body.email)) {
      let newUser = new User(req.body)
      newUser.password = bcrypt.hashSync(req.body.password, 10)
      newUser.save((err, user) => {
        if (err) {
          if (err.message.match(/^E11000 duplicate key error.+/)) {
            res.status(400).json({ success: false, message: 'Email already used' })
          } else res.status(500).json({ success: false, message: err.message })
        } else {
          helper.beforeSendUser(user)
          res.status(200).json({ success: true, message: 'New user registered successfully!', content: user })
        }
      })
    } else res.status(400).json({ success: false, message: 'Valid email required.' })
  } else res.status(400).json({ success: false, message: 'Missing email and/or password.' })
})

export default router