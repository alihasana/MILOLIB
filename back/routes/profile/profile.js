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

// {runValidators : true}
// exploiter le contenue de "result" pour faire des réponses differentes

router.put('/test', (req, res) => {
  var lol = bcrypt.hashSync(req.body.password, 10)
  res.status(200).json({ success: true, content: lol })
})

router.put('/', (req, res) => {
  for (let key of Object.keys(req.body)) {
    res.locals.user[key] = req.body[key];
  }
  res.locals.user.unmarkModified('hashPassword')
  // res.locals.user.unmarkModified('email')
  // res.locals.user.unmarkModified('role')
  //
  var messageArray = ['Profile updated.', '', '', '']
  //
  if (req.body.password || req.body.hashPassword || req.body.role) {
    controller.protectedUpdate(req.body, res.locals.user, messageArray)
    // controller.test(messageObj)
  }
  //
  res.locals.user.save( (err) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    // else res.status(200).json({ success: true, message: messageObj.baseMessage + messageObj.errMessage1 + messageObj.errMessage2 + messageObj.errMessage3, content: result })
    else res.status(200).json({ success: true, message: messageArray[0] + messageArray[1] + messageArray[2] + messageArray[3] })
  })
  // res.locals.user.update(req.body, (err, result) => {
  //   if (err) res.status(500).json({ success: false, message: err.message })
  //   // else res.status(200).json({ success: true, message: messageObj.baseMessage + messageObj.errMessage1 + messageObj.errMessage2 + messageObj.errMessage3, content: result })
  //   else res.status(200).json({ success: true, message: messageArray[0] + messageArray[1] + messageArray[2] + messageArray[3], content: result })
  // })
})

// router.put('/', (req, res) => {
//   for (let key of Object.keys(req.body)) {
//     res.locals.user[key] = req.body[key];
//   }
//   //
//   var message = 'Profile updated.'
//   // res.locals.message = []
//   // res.locals.message.resMessage1 = ''
//   // res.locals.message.resMessage2 = ''
//   // res.locals.message.resMessage3 = ''
//   //
//   if (req.body.password || req.body.hashPassword || req.body.role) {
//     // controller.protectedUpdate()
//     controller.test()
//   }
//   //
//   //
//   res.locals.user.update(req.body, (err, result) => {
//     if (err) res.status(500).json({ success: false, message: err.message })
//     // else res.status(200).json({ success: true, message: message + res.locals.message.resMessage1 + res.locals.message.resMessage2 + res.locals.message.resMessage3, content: result })
//     else res.status(200).json({ success: true, response: res })
//   })
// })

// pour router.put : if (req.body.password || req.body.hashPassword) functionQuiGereLeBail()

export default router