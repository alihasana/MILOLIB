import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model'
import helper from '../../helpers/helper'
const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else {
      for(let i=0; i<users.length; i++) {
        helper.beforeSendUser(users[i])
      }
      res.status(200).json({ success: true, message: 'Here is the list of users!', content: users})
    }
  })
})

router.get('/:id', (req, res) => {
  // if (ObjectId.isValid(req.params.id)) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      if (err.message.match(/^E11000 duplicate key error index.+/)) {
        res.status(400).json({ success: false, message: 'Email already used' })
      } else res.status(500).json({ success: false, message: err.message })
    }
    else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
    else {
      helper.beforeSendUser(user)
      res.status(200).json({ success: true, message: 'Here is the user profile!', content: user })
    }
  })
  // } else res.status(400).json({ success: false, message: 'Invalid ID' })
})

router.post('/', (req, res) => {
  if (res.locals.user.role == 'admin') {
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
            helper.beforeSendUser(user)
            res.status(200).json({ success: true, message: 'New user successfully created!', content: user })
          }
        })
      } else res.status(412).json({ success: false, message: 'Valid email required.' })
    } else res.status(412).json({ success: false, message: 'Missing email and/or password.' })
  } else res.status(403).json({ succes: false, message: 'Forbidden.' })
})

router.put('/:id', (req, res) => {
  if (res.locals.user.role == 'admin') {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, (err, user) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          if (req.body.hashOLDPasswordOLD) res.status(400).json({ message: 'Really?' })
          else {
            if (req.body.password && req.body.oldPassword) {
              if (!user.comparePasswords(req.body.oldPassword)) {
                res.status(401).json({ success: false, message: 'Old password not matching.' })
              } else {
                req.body.password = bcrypt.hashSync(req.body.password, 10)
              }
            }
            User.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
              if (err) {
                res.status(500).json({ success: false, message: err.message })
              } else {
                res.status(200).json({ success: true, message: 'User updated!' })
              }
            })
          }
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found..' })
    }
  } else {
    res.status(401).json({ success: false, message: 'You are not authorized to do this action..' })
  }
})

router.delete('/:id', (req, res) => {
  if (res.locals.user.role == 'admin') {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.status(500).json({success: false, message: err.message})
        } else {
          User.remove({ _id: req.params.id }, (err) => {
            if (err) res.status(500).json({success: false, message: err.message})
            else {
              res.status(200).json({success: true, message: 'The user has been deleted!'})
            }
          })
        }
      })
    } else res.status(404).json({success: false, message: 'User not found..'})
  } else res.status(401).json({success: false, message: 'You are not authorized to do this action..'})
})

export default router

// ???
// Gestion d'erreurs un peu different entre "router.get/put/delete" . A voir ce qui est le plus pertinent