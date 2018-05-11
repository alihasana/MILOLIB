import express from 'express'
import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
// import User from './../users/model'
import helper from './../../../helpers/helper'
import controller from './controller'
// const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

//get connected profil
router.get('/', (req, res) => {
  helper.beforeSendUser(res.locals.user)
  res.status(200).json({ success: true, message: 'Your profile.', content: res.locals.user })
})


// TODO : réecrire avec full controller (avec promise), sans le 'messageArray'.
router.put('/', (req, res) => {
  var messageArray = ['Profile updated.', '', '']

  var password = req.body.password // TODO: Fix pas terrible, a modifier
  delete req.body.password // TODO: Fix pas terrible, a modifier
  for (let key of Object.keys(req.body)) {
    res.locals.user[key] = req.body[key];
  }
  req.body.password = password // TODO: Fix pas terrible, a modifier
  
  res.locals.user.unmarkModified('role')
  if (req.body.password || req.body.email) {
    controller.protectedUpdate(req.body, res.locals, messageArray)
  }
  res.locals.user.save((err) => {
    if (err) {
      if (err.message.match(/^E11000 duplicate key error.+/)) {
        res.status(400).json({ success: false, message: 'Profile update failed, new Email already used' })
      } else res.status(500).json({ success: false, message: err.message })
    }
    
    if (messageArray[0] !== 'Profile updated.') {
      return res.status(400).json({ success: true, message: messageArray[0] + messageArray[1] + messageArray[2] })
    }

    res.status(200).json({ success: true, message: messageArray[0] })
  })
})

export default router