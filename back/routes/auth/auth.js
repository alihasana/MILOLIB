import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../../helpers/helper'
import User from './../users/model'
let router = express.Router()

router.post('/login', (req, res) => {
  if (!req.body.email && !req.body.password) {
    return res.status(400).json({ success: false, message: 'Missing email and/or password.' })
  }
  User.findOne({ email: helper.caseInsensitive(req.body.email) }, (err, user) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!user) res.status(400).json({ success: false, message: 'Email and/or password incorrect.' })
    else if (user.active !== true) res.status(403).json({ success: false, message: 'Inactive account. Please contact an administrator.' })
    else {
      if (!user.comparePasswords(req.body.password)) {
        return res.status(400).json({ success: false, message: 'Email and/or password incorrect.' })
      }
      // JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...})
      jwt.sign({ email: user.email, _id: user._id, userCollection: 'User' }, process.env.SECRETKEY, (err, result) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'Welcome !', content: { token: process.env.AUTHBEARER + ' ' + result, user: user.role } }) // TODO : namming bizzar. Alernative (role: user.role OU userRole: user.role)
      })
    }
  })
})

router.post('/signup', (req, res) => {
  if (!req.body.email && !req.body.password) {
    return res.status(400).json({ success: false, message: 'Missing email and/or password.' })
  }
  if (helper.regexEmail.test(req.body.email)) {
    return res.status(400).json({ success: false, message: 'Valid email required.' })
  }
  let newUser = new User(req.body)
  var calendarId = new ObjectId()
  newUser.calendar = calendarId
  newUser.password = bcrypt.hashSync(req.body.password, 10)
  newUser.save((err, user) => {
    if (err) {
      if (err.message.match(/^E11000 duplicate key error.+/)) {
        return res.status(400).json({ success: false, message: 'Email already used' })
      } else return res.status(500).json({ success: false, message: err.message })
    }
    let newCalendar = new Calendar({ userId: user._id, _id: calendarId })
    newCalendar.save((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      // //WIP a voir avec Luke
      // //envoie de mail ici
      // //WIP
      helper.beforeSendUser(user)
      res.status(200).json({ success: true, message: 'New user registered successfully!', content: user })
    })
  })
})

export default router
