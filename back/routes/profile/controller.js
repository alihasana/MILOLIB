import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  protectedUpdate: (body, locals, messageArray) => {
      // a voir ou mettre les unmarkedModified, 
      // les mettres direct là evite les doublons mais,
      // oblige a refaire des 'locals.user.anything = body.anything'
    if (body.password) {
      if (!(body.oldPassword && locals.userUnmodified.comparePasswords(body.oldPassword)) ) {        
        messageArray[1] = ' Actual password incorrect. '
      } else {
        locals.user.hashPassword = bcrypt.hashSync(body.password, 10)
      }
    }
    if (body.email) {
      if (helper.regexEmail.test(body.email)) {
        if (!(body.oldEmail && body.oldEmail === locals.userUnmodified.email) ) {
          locals.user.unmarkModified('email')
          messageArray[2] = ' Actual email incorrect. '
        }
      } else {
        locals.user.unmarkModified('email')     
        messageArray[2] = ' Valid email required. '
      } 
    }
    if (body.role) {
      // Pas de condition pour le moment, on ne peux simplement pas modifier son role
      locals.user.unmarkModified('role')      
      messageArray[3] = ' You can\'t modify your own role. '      
    }
    if ( (messageArray[1] || messageArray[2] || messageArray[3]) !== '' ) {
      messageArray[0] = 'Profile partialy updated, error in your request :'
    }
  },
}