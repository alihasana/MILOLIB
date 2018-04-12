import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  protectedUpdate: (body, locals, messageArray) => {
    if (body.password) {
      if (!(body.oldPassword && locals.user.comparePasswords(body.oldPassword)) ) {
        messageArray[1] = ' Actual password incorrect. '
      } else {
        locals.user.hashPassword = bcrypt.hashSync(body.password, 10)
      }
    }
    if (body.email) {
      if (helper.regexEmail.test(body.email)) {
        if (!(body.oldEmail && body.oldEmail === locals.userUnmodified.email) ) {
          messageArray[2] = ' Actual email incorrect. '
        }
      } else {  
        messageArray[2] = ' Valid email required. '
      } 
    }
    // 'locals.user.unmarkModified('role')', a deplacer au début de la route comme hashPassword ? Message d'erreur inutile
    if (body.role) {
      // Pas de condition pour le moment, on ne peux simplement pas modifier son role  
      messageArray[3] = ' You can\'t modify your own role. '      
    }
    if ( (messageArray[1] || messageArray[2] || messageArray[3]) !== '' ) {
      messageArray[0] = 'Profile partialy updated, error in your request :'
      messageArray[0] = ''
      locals.user.unmarkModified('email')
      locals.user.unmarkModified('role')
      // Deplacer tous les 'locals.user.unmarkModified' ici. Si il y a eu la moindre erreur, aucune infos sensibles de modifier
    }
  },
}

// a voir ou mettre les unmarkedModified, 
// les mettres direct en haut evite les doublons mais,
// oblige a refaire des 'locals.user.anything = body.anything'