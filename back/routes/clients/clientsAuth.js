import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../../helpers/helper'
import Client from './model'
let router = express.Router()

router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    Client.findOne({ email: helper.caseInsensitive(req.body.email) }, (err, client) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      else if (!client) res.status(400).json({ success: false, message: 'Email and/or password incorrect.' })
      else {
        if (!client.comparePasswords(req.body.password)) {
          res.status(400).json({ success: false, message: 'Email and/or password incorrect.' })
        } else {
          // JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...})
          jwt.sign({ email: client.email, _id: client._id, userCollection: 'Client' }, process.env.SECRETKEY, (err, result) => {
            if (err) res.status(500).json({ success: false, message: err.message })
            else res.status(200).json({ success: true, message: 'Welcome !', content: { token: process.env.AUTHBEARER + ' ' + result, user: client.role } })
          })
        }
      }
    })
  } else res.status(400).json({ success: false, message: 'Missing email and/or password.' })
})

router.post('/signup', (req, res) => {
  if (req.body.email && req.body.password) {
    if (helper.regexEmail.test(req.body.email)) {
      let newClient = new Client(req.body)
      newClient.password = bcrypt.hashSync(req.body.password, 10)
      newClient.save((err, client) => {
        if (err) {
          if (err.message.match(/^E11000 duplicate key error.+/)) {
            res.status(400).json({ success: false, message: 'Email already used' })
          } else res.status(500).json({ success: false, message: err.message })
        } else {
          helper.beforeSendUser(client)
          res.status(200).json({ success: true, message: 'New client registered successfully!', content: client })
        }
      })
    } else res.status(400).json({ success: false, message: 'Valid email required.' })
  } else res.status(400).json({ success: false, message: 'Missing email and/or password.' })
})

export default router
