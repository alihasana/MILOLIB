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

// Route pour enregister un utilisateur
users.post('/', (req, res) => {
  if (req.milo && req.milo.role == 'admin') {
    if (req.body.email && req.body.password && req.body.role) {
      // On verifie que l'utilisateur existe avec findOne encore
      User.findOne({ email: req.body.email }, function (err, result) {
        if (result === null) {
          // puis on en créé un si il n'existe pas
          let newUser = new User(req.body)
          // on hash son password avec la méthode hashSync de bcrypt
          newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
          // et enfin on sauvegarde l'utilisateur dans la base
          newUser.save(function (err, user) {
            if (err) {
              res.status(400).json({ success: false, message: err.message })
            } else {
              user.hash_password = undefined
              res.status(200).json({ success: true, message: 'New user registered successfuly!', content: user })
            }
          })
        } else {
          res.status(412).json({ success: false, message: 'Email already used..' })
        }
      })
    } else {
      res.status(412).json({ success: false, message: 'Some data is missing..' })
    }
  }
})

// Route pour recuperer son propre profil
users.get('/self', (req, res) => {
  if (req.milo && ObjectId.isValid(req.milo._id)) {
    User.findById(req.milo._id, function (err, self) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        self.hash_password = undefined
        self.__v = undefined
        res.status(200).json({success: true, message: 'Here is your profile!', content: self})
      }
    })
  } else {
    res.status(404).json({success: false, message: 'User not found..'})
  }
})

users.patch('/self', (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  if (req.body && _email && _password) {
    if (req.milo && ObjectId.isValid(req.milo._id)) {
      User.findById(req.milo._id, function (err, user) {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          const updateOps = {};
          // Pour chaque nom de clé du body, on ajoute une clé de même nom à l'objet updateOps
          // et on lui attribue la valeur de la clé correspondante du body
          for (const key of Object.keys(req.body)) {
            updateOps[key] = req.body[key];
          }
          updateOps.hash_password = bcrypt.hashSync(_password, 10)
          User.update({ _id: req.milo._id }, { $set: updateOps }, function (err, updatedUser) {
            if (err) res.status(500).json({ success: false, message: err.message })
            else {
              updatedUser.hash_password = undefined
              updatedUser.__v = undefined
              res.status(200).json({ success: true, message: 'User updated!', content: updatedUser })
            }
          })
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found..' })
    }
  } else {
    res.status(400).json({ success: false, message: 'Data is missing..' })
  }
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

// Route pour update un user, on trouve le user avec findById puis on l'edit&save
users.patch('/:id', (req, res) => {
  if (req.milo && req.milo.role == 'admin') {
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
                updatedUser.__v = undefined
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
  } else {
    res.status(401).json({success: false, message: 'You are not authorized to do this action..'})
  }
})

// Route pour delete un user, on utilise la méthode remove() du modele associé
users.delete('/:id', (req, res) => {
  if (req.milo && req.milo.role == 'admin') {
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
  } else {
    res.status(401).json({success: false, message: 'You are not authorized to do this action..'})
  }
})

export default users
