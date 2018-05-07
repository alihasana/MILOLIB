import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from './../routes/users/model'
import Client from './../routes/clients/model'
const ObjectId = mongoose.Types.ObjectId

// jwy.verify(TOKEN, SECRETKEY, CALLBACK(err, result){...})
let verifyToken = (req, res, next) => {
  console.log('Le Body : ', req.body) // WIP : For testing purpose
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.AUTHBEARER) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, (err, decode) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        // res.locals permet de stocker des datas utilisable dans la requête en cours
        res.locals.decode = decode
        if (ObjectId.isValid(decode._id)) {
          if (decode.userCollection === 'User') var Collection = User // Anciennement un 'let', erreur 'SyntaxError'. Pourquoi ?
          else if (decode.userCollection === 'Client') var Collection = Client
          else return res.status(400).json({ success: false, message: 'Bad request' })

          Collection.findById(decode._id, (err, user) => {
            if (err) res.status(500).json({ success: false, message: err.message })
            else if (!user) res.status(401).json({ success: false, message: 'Unauthozired' })
            else if (decode.userCollection === 'User' && user.active !== true) res.status(403).json({ success: false, message: 'Inactive account. Please contact an administrator.' }) // TODO : verif active is working 
            else {
              res.locals.user = user
              console.log('Le User : ', res.locals.user) // WIP : For testing purpose
              // res.locals.userUnmodified = JSON.parse(JSON.stringify(user)) // Clone of user for verification purpose
              next()
            }
          })
        } else res.status(400).json({ success: false, message: 'Invalid ID' })
      }
    })
  } else res.status(401).json({ success: false, message: 'Unauthozired' })
}

export default verifyToken
