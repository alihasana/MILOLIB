import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  protectedUpdate: (body, locals, messageArray) => {
    if (body.password) {
      if (!(body.oldPassword && locals.user.comparePasswords(body.oldPassword))) {
        messageArray[1] = ' Actual password incorrect. '
      } else {
        locals.user.password = bcrypt.hashSync(body.password, 10)
      }
    }
    // J'AI DESACTIVER POUR LE MOMENT PARCE QUE C'EST RELOU SI T'EDIT L'ADMIN
    // QUI A PAS D'EMAIL VALIDE CA BLOQUE, VOIR LE FRONT............
    // if (body.email) {
    //   if (!helper.regexEmail.test(body.email)) {
    //     messageArray[2] = ' Valid email required. '
    //   }
    // }
    
    // 'locals.user.unmarkModified('role')', a deplacer au début de la route ? Message d'erreur inutile
    // if (body.role) {
    //   // Pas de condition pour le moment, on ne peux simplement pas modifier son role  
    //   messageArray[3] = ' You can\'t modify your own role. '      
    // }
    if ((messageArray[1] || messageArray[2]) !== '') {
      messageArray[0] = 'Validation failed :'
      locals.user.unmarkModified('email')
      locals.user.unmarkModified('password')
      // locals.user.unmarkModified('role')      
      // Deplacer tous les 'locals.user.unmarkModified' ici. Si il y a eu la moindre erreur, aucune infos sensibles de modifier
    }
  },
}