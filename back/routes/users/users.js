import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model'
import helper from '../../helpers/helper';
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

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
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id, (err, user) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      if (!user) res.status(404).json({ success: false, message: 'User not found.' })
      else {
        helper.beforeSendUser(user)
        res.status(200).json({ success: true, message: 'Here is the user profile!', content: user })
      }
    })
  } else res.status(400).json({ success: false, message: 'Invalid ID' })
})

// router.put('/:id', (req, res) => {
//   if (req.body && req.body.email && req.body.password) {
//     if (ObjectId.isValid(req.params.id)) {
//       User.findById(req.params.id, function (err, user) {
//         if (!user) {
//           res.status(404).json({ success: false, message: 'User not found..' })
//         } else {
//           if (err) res.status(500).json({success: false, message: err.message})
//           else {
//             user.email = req.body.email;
//             user.hashPassword = bcrypt.hashSync(req.body.password, 10)
//             user.save(function (err, updatedUser) {
//               if (err) {
//                 res.status(500).json({success: false, message: err.message})
//               } else {
//                 updatedUser.hashPassword = undefined
//                 res.status(200).json({ success: true, message: 'User updated!', content: updatedUser}) }
//             })
//           }
//         }
//       })
//     } else {
//       res.status(400).json({ success: false, message: 'Invalid ID' })
//     }
//   } else {
//     res.status(400).json({ success: false, message: 'Data is missing..'})
//   }
// })

// router.delete('/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     User.findById(req.params.id, function (err, user) {
//       if (err) {
//         res.status(500).json({success: false, message: err.message})
//       } else if (!user) {
//         res.status(404).json({ success: false, message: 'User not found..'})
//       } else {
//         User.remove({ _id: req.params.id }, function (err) {
//           if (err) res.status(500).json({success: false, message: err.message})
//           else {
//             res.status(200).json({ success: true, message: 'User deleted!'})
//           }
//         })
//       }
//     })
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid ID' })
//   }
// })

export default router

// ???
// Gestion d'erreurs un peu different entre "router.get/put/delete" . A voir ce qui est le plus pertinent