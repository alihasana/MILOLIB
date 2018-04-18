import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model'
import helper from '../../helpers/helper'
import controller from './controller';
import mail from '../../middlewares/mail' //Mettre mail dans les helpers ?

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
  User.findById(req.params.id, (err, user) => {
    if (err) {
      if (err.message.match(/^Cast to ObjectId failed.+/)) {
        res.status(400).json({ success: false, message: 'Invalid ID' })
      } else res.status(500).json({ success: false, message: err.message })
    }
    else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
    else {
      helper.beforeSendUser(user)
      res.status(200).json({ success: true, message: 'Here is the user profile!', content: user })
    }
  })
})

router.put('/:id', (req, res) => { // WIP, a voir
  if (res.locals.user.role == 'Administrateur') {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        if (err.message.match(/^Cast to ObjectId failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid ID' })
        } else res.status(500).json({ success: false, message: err.message })
      }
      else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
      else {
        if (req.body.password) {
          req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        if (req.body.email) {

        }
        User.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
          if (err) {
            res.status(500).json({ success: false, message: err.message })
          } else {
            res.status(200).json({ success: true, message: 'User updated!' })
          }
        })
      }
    })
  } else res.status(403).json({ success: false, message: 'Forbidden.' })
})

router.post('/', (req, res) => {
  if (res.locals.user.role == 'Administrateur') {
    if (req.body.email && req.body.password) {
      if (helper.regexEmail.test(req.body.email)) {
        let newUser = new User(req.body)
        newUser.password = bcrypt.hashSync(req.body.password, 10)
        newUser.save((err, user) => {
          if (err) {
            if (err.message.match(/^E11000 duplicate key error.+/)) {
              res.status(400).json({ success: false, message: 'Email already used.' })
            } else res.status(500).json({ success: false, message: err.message })
          } else {
            //WIP a voir avec Luke
            const msg = {
              to: '',
              from: 'milolib@milolib.com',
              subject: 'Your are register',
              text: 'Congrat you successfully registered into Milolib',
            };
            //sendMail commenter jusau a ce que compte sendgrid creer
            // sendMail(req.body.email, msg)
            //WIP
            helper.beforeSendUser(user)
            res.status(200).json({ success: true, message: 'New user successfully created!', content: user })
          }
        })
      } else res.status(412).json({ success: false, message: 'Valid email required.' })
    } else res.status(412).json({ success: false, message: 'Missing email and/or password.' })
  } else res.status(403).json({ succes: false, message: 'Forbidden.' })
})

router.delete('/:id', (req, res) => {
  if (res.locals.user.role == 'Administrateur') {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, (err, user) => { // FindById un peu osef sur ce coup
        if (err) {
          if (err.message.match(/^Cast to ObjectId failed.+/)) {
            res.status(400).json({ success: false, message: 'Invalid ID' })
          } else res.status(500).json({ success: false, message: err.message })
        }
        else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
        else {
          User.remove({ _id: req.params.id }, (err) => {
            if (err) res.status(500).json({success: false, message: err.message})
            else {
              res.status(200).json({success: true, message: 'The user has been deleted!'})
            }
          })
        }
      })
    } else res.status(404).json({success: false, message: 'User not found.'})
  } else res.status(403).json({ success: false, message: 'Forbidden.'})
})

export default router

// ???
// Gestion d'erreurs un peu different entre "router.get/put/delete" . A voir ce qui est le plus pertinent