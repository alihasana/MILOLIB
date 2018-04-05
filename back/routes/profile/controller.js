import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  protectedUpdate: (body, user, messageArray) => {
    if (body.password) {
      if ( !(body.oldPassword && user.comparePasswords(body.oldPassword)) ) {
        messageArray[0] = 'Profile partialy updated because a part of your request are incorrect :'
        messageArray[1] = ' Actual password incorrect. '
      } else {
        user.hashPassword = bcrypt.hashSync(body.password, 10)
      }
    }

    if (body.email) {
      if ( !(body.oldEmail && body.oldEmail == user.email) ) {
        user.unmarkModified('email')
        messageArray[0] = 'Profile partialy updated because a part of your request are incorrect :'        
        messageArray[2] = ' Actual email incorrect. '
      } else {
        console.log('flag 1')
      }
    } else {
      console.log('flag 3')
    }
    
    if (body.role) {
      // Pas de condition pour le moment, on ne peux simplement pas modifier le data.role
      user.unmarkModified('role')
      messageArray[0] = 'Profile partialy updated because a part of your request are incorrect :'      
      messageArray[3] = ' You can\'t modify your own role. '      
    }
  },

  test: function (a) {
    console.log('test executé')
    // var leTest = Object.keys(a)
    // console.log(leTest)
    a[1] = ' Actual password incorrect. '
    a[3] = ' Actual emadsdqdsdqdqsdsqdil incorrect. '
    // a.errMessage1 = ' Actual password incorrect. '
    // a.errMessage3 = ' Actual emadsdqdsdqdqsdsqdil incorrect. '
    // return messageObj
  },
}