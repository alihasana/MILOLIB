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
      if (err) res.status(500).json({ success: false, message: err.message })
      else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
      else {
        helper.beforeSendUser(user)
        res.status(200).json({ success: true, message: 'Here is the user profile!', content: user })
      }
    })
  // } else res.status(400).json({ success: false, message: 'Invalid ID' })
})

router.put('/:id', (req, res) => {
  if (res.locals.user.role == 'admin') {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, (err, user) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          if (req.body.hashPassword) res.status(400).json({message: 'Really?'})
          else {
            if (req.body.password && req.body.oldPassword) {
              if (!user.comparePasswords(req.body.oldPassword)) {
                res.status(401).json({ success: false, message: 'Old password not matching.' })
              } else {
                req.body.hashPassword = bcrypt.hashSync(req.body.password, 10)
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
  // if (res.locals.user.role == 'admin') {
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
    } else {
      res.status(404).json({success: false, message: 'User not found..'})
    }
  // } else {
  //   res.status(401).json({success: false, message: 'You are not authorized to do this action..'})
  // }
})

export default router

// ???
// Gestion d'erreurs un peu different entre "router.get/put/delete" . A voir ce qui est le plus pertinent

//Create New User
router.post('/create-user', (req, res) => {
  let body = req.body; 
  console.log('body: ', body);
  if (body.email && body.pswd) {
      User.findOne({ email: body.email }, function (err, doc) {
          if (doc == null) {
              let newUser = new User;
              newUser.email = req.body.email;
              newUser.role = req.body.role;
              newUser.hashPassword = req.body.pswd;
              console.log('New User object', newUser);
              newUser.save(function(err){
                  if (err) {
                      return err;
                  } else {
                      return res.status(200).send('New user has been created');
                  }
              }); 
          } else {
              console.log('This user has already been created'); 
              return res.status(400).send({ message: 'This user has already been created' })
          }
      });
  } else {
      console.log('All the fields are required')
      return res.status(412).send({ message: 'All the fields are required' })
  }
});