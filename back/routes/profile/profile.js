import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from '../../helpers/helper'
import controller from './controller';
const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

router.get('/', (req, res) => {
  // helper.beforeSendUser(res.locals.user)
  res.status(200).json({ success: true, message: 'Your profile.', content: res.locals.user })
})

router.get('/test', (req, res) => {
  // helper.beforeSendUser(res.locals.user)
  res.status(200).json({ success: true, message: 'Your res.', content: res.locals })
})

// {runValidators : true}
// exploiter le contenue de "result" pour faire des réponses differentes

router.put('/', (req, res) => {
  var messageArray = ['Profile updated.', '', '', '']
  //'res.locals.user' is the actual connected user
  for (let key of Object.keys(req.body)) {
    res.locals.user[key] = req.body[key];
  }
  res.locals.user.unmarkModified('hashPassword')
  if (req.body.password || req.body.email || req.body.role) {
    controller.protectedUpdate(req.body, res.locals, messageArray)
  }
  res.locals.user.save((err) => {
    if (err) {
      if (err.message.match(/^E11000 duplicate key error index.+/)) {
        // inutile ici de gerer "messageArray", mongoose ne save rien si il tombe sur un email deja utilisé
        res.status(400).json({ success: false, message: 'Profile update failed, new Email already used' })
      } else res.status(500).json({ success: false, message: err.message })
    }
    // a voir si je garde le messageArray[0] ou si je l'ecris direct differement dans les 2 routes
    if (messageArray[0] !== 'Profile updated.') {
      res.status(400).json({ success: true, message: messageArray[0] + messageArray[1] + messageArray[2] + messageArray[3] })
    } else res.status(200).json({ success: true, message: messageArray[0] })
  })
})

export default router