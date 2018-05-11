import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model'
import Calendar from './../calendar/model'
import helper from '../../helpers/helper'
import controller from './controller'
import mail from '../../middlewares/mail' // Mettre mail dans les helpers ?
const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      for (let i = 0; i < users.length; i++) {
        helper.beforeSendUser(users[i])
      }
      res.status(200).json({ success: true, message: 'Here is the list of users!', content: users })
    }
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .populate('calendar', 'appointmentTypes')
    .exec((err, user) => {
      if (err) {
        if (err.message.match(/^Cast to ObjectId failed.+/)) {
          return res.status(400).json({ success: false, message: 'Invalid ID' })
        } else return res.status(500).json({ success: false, message: err.message })
      }
      else if (!user) return res.status(404).json({ success: false, message: 'User not found.' })
      helper.beforeSendUser(user)
      res.status(200).json({ success: true, message: 'Here is the user profile!', content: user })
    })
})

router.put('/:id', (req, res) => { // WIP, a voir
  // if (res.locals.user.role != 'Administrateur') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (res.locals.user.role != 'Administrateur' && 'Administrateur/Conseiller') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  delete req.body.active
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }
  if (req.body.email) {
    if (!helper.regexEmail.test(req.body.email)) {
      return res.status(400).json({ success: false, message: 'Valid email required.' })
    }
  }
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      if (err.message.match(/^Cast to ObjectId failed.+/)) {
        res.status(400).json({ success: false, message: 'Invalid ID' })
      } else res.status(500).json({ success: false, message: err.message })
    }
    else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
    else res.status(200).json({ success: true, message: 'User updated!' })
  })
})

router.post('/', (req, res) => {
  // console.log(res.locals.user.role)
  // if (res.locals.user.role != 'Administrateur') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (res.locals.user.role != 'Administrateur' && 'Administrateur/Conseiller') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  // console.log('Le Req : ', req) // WIP : For testing purpose
  // console.log(res.locals.user)
  if (!req.body.email || !req.body.password) return res.status(400).json({ success: false, message: 'Missing email and/or password.' })
  if (!helper.regexEmail.test(req.body.email)) return res.status(400).json({ success: false, message: 'Valid email required.' })
  let newUser = new User(req.body)
  var calendarId = new ObjectId()
  newUser.calendar = calendarId
  newUser.password = bcrypt.hashSync(req.body.password, 10)
  newUser.save((err, user) => {
    if (err) {
      if (err.message.match(/^E11000 duplicate key error.+/)) {
        return res.status(400).json({ success: false, message: 'Email already used.' })
      } else return res.status(500).json({ success: false, message: err.message })
    }
    let newCalendar = new Calendar({ userId: user._id, _id: calendarId })
    newCalendar.save((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      // //WIP a voir avec Luke
      // const msg = {
      //   to: '',
      //   from: 'milolib@milolib.com',
      //   subject: 'Your are register',
      //   text: 'Congrat you successfully registered into Milolib',
      // };
      // //sendMail commenter jusau a ce que compte sendgrid creer
      // // sendMail(req.body.email, msg)
      // //WIP
      helper.beforeSendUser(user)
      res.status(200).json({ success: true, message: 'New user successfully created!', content: user })
    })
  })
})

// "Soft Delete" user
// router.put('/:id/active', (req, res) => {
//   // if (res.locals.user.role != 'Administrateur') return res.status(403).json({ succes: false, message: 'Forbidden.' })
//   if (res.locals.user.role != 'Administrateur' && 'Administrateur/Conseiller') return res.status(403).json({ succes: false, message: 'Forbidden.' })
//   if (req.body.active) {
//     User.findByIdAndUpdate(req.params.id, { active: req.body.active }, (err, user) => {
//       if (err) {
//         if (err.message.match(/^Cast to ObjectId failed.+/)) {
//           res.status(400).json({ success: false, message: 'Invalid ID' })
//         }
//         else if (err.message.match(/^Cast to boolean failed.+/)) {
//           res.status(400).json({ success: false, message: 'Invalid request.' })
//         } else res.status(500).json({ success: false, message: err.message })
//       }
//       else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
//       else {
//         if (req.body.active == 'true') res.status(200).json({ success: true, message: 'User ' + user.email + ' reactivated =D' })
//         else if (req.body.active == 'false') res.status(200).json({ success: true, message: 'User ' + user.email + ' deactivated =\'(' })
//       }
//     })
//   } else res.status(400).json({ success: false, message: 'Invalid request.' })
// })

//Disable a user
router.put('/disable/:id/:active', (req, res) => {
  console.log('req.params.id : ', req.params.id, 'req.params.active: ', req.params.active)
  if (res.locals.user.role != 'Administrateur' && 'Administrateur/Conseiller') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (req.params.active) {
    User.findByIdAndUpdate(req.params.id, { active: req.params.active }, (err, user) => {
      if (err) {
        if (err.message.match(/^Cast to ObjectId failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid ID' })
        }
        else if (err.message.match(/^Cast to boolean failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid request.' })
        } else res.status(500).json({ success: false, message: err.message })
      }
      else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
      else {
        User.update({_id: req.params.id}, { $set: { active: false}}, (err, activeValue) => {
        if (err) {
           console.log('Cannot set user "active" property to false'); 
        } else {
           console.log("Active property set to false: ", activeValue)
           console.log("User details after desactivation", user)
           res.status(200).json({sucess: true, message: "The user account has been deactivated", user: user})
        } 
      })
    }
   })
  } else res.status(400).json({ success: false, message: 'Invalid request.' })
});

// Enable user
router.put('/enable/:id/:active', (req, res) => {
  console.log('req.params.id : ', req.params.id, 'req.params.active: ', req.params.active)
  if (res.locals.user.role != 'Administrateur' && 'Administrateur/Conseiller') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (req.params.active) {
    User.findByIdAndUpdate(req.params.id, { active: req.params.active }, (err, user) => {
      if (err) {
        if (err.message.match(/^Cast to ObjectId failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid ID' })
        }
        else if (err.message.match(/^Cast to boolean failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid request.' })
        } else res.status(500).json({ success: false, message: err.message })
      }
      else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
      else {
        User.update({_id: req.params.id}, { $set: { active: true}}, (err, activeValue) => {
        if (err) {
           console.log('Cannot set user "active" property to true'); 
        } else {
           console.log("Active property set to true: ", activeValue)
           console.log("User details after reactivation", user)
           res.status(200).json({sucess: true, message: "The user account has been reactivated", user: user})
        } 
      })
    }
   })
  } else res.status(400).json({ success: false, message: 'Invalid request.' })
});

export default router