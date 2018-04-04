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

// router.put('/', (req, res) => {
//   for (let key of Object.keys(req.body)) {
//     res.locals.user[key] = req.body[key];
//   }
//   //
//   var message = 'Profile updated.'

//   // PROBLEMES DE SCOPE DES VARIABLES, A REVOIR

//   // var resMessage1 = resMessage2 = resMessage3 = ''
//   var resMessage1 = ''
//   var resMessage2 = ''
//   var resMessage3 = ''
//   //
//   if (req.body.password || req.body.hashPassword || req.body.role) {
//     // controller.protectedUpdate()
//     controller.test(resMessage1)
//   }
//   //
//   //
//   res.locals.user.update(req.body, (err, result) => {
//     if (err) res.status(500).json({ success: false, message: err.message })
//     else res.status(200).json({ success: true, message: message + resMessage1 + resMessage2 + resMessage3, content: result })
//   })
// })

router.put('/', (req, res) => {
  for (let key of Object.keys(req.body)) {
    res.locals.user[key] = req.body[key];
  }
  //
  var message = 'Profile updated.'
  // res.locals.message = []
  // res.locals.message.resMessage1 = ''
  // res.locals.message.resMessage2 = ''
  // res.locals.message.resMessage3 = ''
  //
  if (req.body.password || req.body.hashPassword || req.body.role) {
    // controller.protectedUpdate()
    controller.test()
  }
  //
  //
  res.locals.user.update(req.body, (err, result) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    // else res.status(200).json({ success: true, message: message + res.locals.message.resMessage1 + res.locals.message.resMessage2 + res.locals.message.resMessage3, content: result })
    else res.status(200).json({ success: true, response: res })
  })
})

// pour router.put : if (req.body.password || req.body.hashPassword) functionQuiGereLeBail()

export default router