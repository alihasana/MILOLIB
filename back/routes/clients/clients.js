import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import client from './model'
import helper from '../../helpers/helper'

let router = express.Router()

router.post('/', (req, res) => {
  if (req.body.email && req.body.password) {
    if (helper.regexEmail.test(req.body.email)) {
      let newClient = new Client(req.body)
      newClient.password = bcrypt.hashSync(req.body.password, 10)
      newClient.save((err, client) => {
        if (err) {
          if (err.message.match(/^E11000 duplicate key error.+/)) {
            res
              .status(400)
              .json({ success: false, message: 'Email already used.' })
          } else res.status(500).json({ success: false, message: err.message })
        } else {
          //WIP a voir avec Luke
          // const msg = {
          //   to: '',
          //   from: 'milolib@milolib.com',
          //   subject: 'Your are register',
          //   text: 'Congrat you successfully registered into Milolib'
          // }
          //sendMail commenter jusau a ce que compte sendgrid creer
          // sendMail(req.body.email, msg)
          //WIP
          helper.beforeSendUser(client)
          res.status(200).json({
            success: true,
            message: 'New user successfully created!',
            content: client
          })
        }
      })
    } else
      res.status(400).json({ success: false, message: 'Valid email required.' })
  } else
    res
      .status(400)
      .json({ success: false, message: 'Missing email and/or password.' })
})

router.get('/', (req, res) => {
  Client.find({}, (err, clients) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      for (let i = 0; i < clients.length; i++) {
        helper.beforeSendUser(clients[i])
      }
      res.status(200).json({
        success: true,
        message: 'Here is the list of clients!',
        content: clients
      })
    }
  })
})

router.get('/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    if (err) {
      if (err.message.match(/^Cast to ObjectId failed.+/)) {
        res.status(400).json({ success: false, message: 'Invalid ID' })
      } else res.status(500).json({ success: false, message: err.message })
    } else if (!user)
      res.status(404).json({ success: false, message: 'User not found.' })
    else {
      helper.beforeSendUser(client)
      res.status(200).json({
        success: true,
        message: 'Here is the client profile!',
        content: client
      })
    }
  })
})

export default router

// ???
// Gestion d'erreurs un peu different entre "router.get/put/delete" . A voir ce qui est le plus pertinent
