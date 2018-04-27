import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  checkSlotsConflict: (arr2, val) => {
    console.log('Le arr2 ' + arr2)
    return arr2.some(function (arr2Element) {
      return val === arr2Element.start
    })
  },
  asyncCall: (locals) => {
    console.log('calling')
    return await createCalendar()
    console.log(result)
  },
  createCalendar: (locals) => {
    let newCalendar = new Calendar({ userId: locals.user.id })
    newCalendar.save((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
    })
  },
}