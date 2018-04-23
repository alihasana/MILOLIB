import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Client from './model'
import helper from '../../helpers/helper'

let router = express.Router()

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
