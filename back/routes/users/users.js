import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let users = express.Router();

// Route pour récuperer tous les utilisateurs
// On utilise la méthode find() du modèle mongoose 'User' qui renvoi ici tous les users
users.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else {
      for(let i=0; i<users.length; i++) {
        users[i].hash_password = undefined
        users[i].__v = undefined
      }
      res.status(200).json({success: true, message: 'Here is the list of users!', content: users})
    }
  })
})

// Route pour recuperer le profil d'un utilisateur en particulier
// on peut utiliser findById avec l'id en parametre
users.get('/:id', (req, res) => {
  // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        user.hash_password = undefined
        user.__v = undefined
        res.status(200).json({success: true, message: 'Here is the user profile!', content: user})
      }
    })
  } else {
    res.status(404).json({success: false, message: 'User not found..'})
  }
})

// Route pour update un message, on trouve le message avec findById puis on l'edit&save
users.put('/:id', (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  if (req.body && _email && _password) {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, function (err, user) {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          user.email = _email;
          user.hash_password = bcrypt.hashSync(_password, 10)
          user.save(function (err, updatedUser) {
            if (err) {
              res.status(500).json({success: false, message: err.message})
            } else {
              updatedUser.hash_password = undefined
              res.status(200).json({success: true, message: 'User updated!', content: updatedUser})
            }
          })
        }
      })
    } else {
      res.status(404).json({success: false, message: 'User not found..'})
    }
  } else {
    res.status(400).json({success: false, message: 'Data is missing..'})
  }
})

// Route pour delete un message, on utilise la méthode remove() du modele mongoose ezpz
users.delete('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        res.status(500).json({success: false, message: err.message})
      } else if (!user) {
        res.status(404).json({success: false, message: 'User not found..'})
      } else {
        User.remove({ _id: req.params.id }, function (err) {
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
})

export default users
