import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  protectedUpdate: () => {
    // les 'res.status' ne sont peut-être pas correct (vue que l'on referra un plus tard dans la route), a voir.
    if (req.body.password || req.body.hashPassword) {
      if ( !(req.body.oldPassword && req.body.oldPassword == res.locals.user.comparePasswords(req.body.oldPassword)) ) {
        res.locals.user.unmarkModified('hashPassword')
        res.status(401).json({ success: false, message: 'Actual password incorrect' })
        resMessage1 = 'lol'
      }
    }
    if (req.body.email) {
      if ( !(req.body.oldEmail == res.locals.user.email) ) {
        res.locals.user.unmarkModified('email')
        res.status(401).json({ success: false, message: 'Actual email incorrect' }) 
      }
    }
    if (req.body.role) {
      // Pas de condition pour le moment, on ne peux simplement pas modifier le data.role
      res.locals.user.unmarkModified('role')
    }
  },

  test: () => {
    return res.locals.message.resMessage1 = 'Actual password incorrect.'
  },
}