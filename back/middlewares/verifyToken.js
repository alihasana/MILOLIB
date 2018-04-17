import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from './../routes/users/model'
const ObjectId = mongoose.Types.ObjectId

// la premiere partie est égale à un mot defini dans la config, et la seconde est égale au token.
// jwy.verify(TOKEN, SECRETKEY, CALLBACK(err, result){...})
// Ce dernier correspond au token décodé, on retrouve le payload (ex: email utilisateur, id etc..)
// on appelle next() pour dire que tout s'est bien passé et qu'on peut passer à la suite (circulez svp!)
let verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.AUTHBEARER) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, (err, decode) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        // res.locals permet de stocker des datas utilisable dans la requête en cours
        res.locals.decode = decode
        if (ObjectId.isValid(decode._id)) {
          User.findById(decode._id, (err, user) => {
            if (err) res.status(500).json({ success: false, message: err.message })
            if (!user) res.status(401).json({ success: false, message: 'Unauthozired' })
            else {
              res.locals.user = user
              res.locals.userUnmodified = JSON.parse(JSON.stringify(user)) // Clone of user for verification purpose
              next()
            }
          })
        } else res.status(400).json({ success: false, message: 'Invalid ID' })
      }
    })
  } else res.status(401).json({ success: false, message: 'Unauthozired' })
}

export default verifyToken