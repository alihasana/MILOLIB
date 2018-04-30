import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper'
import controller from './controller'

export default {
  checkSlotsConflict: (arr2, val) => {
    return arr2.some(function (arr2Element) {
      return val === arr2Element.start
    })
  },
  // WIP, not working
  asyncCall: async (locals) => {
    console.log('asyncCall 1')
    return await controller.createCalendar(locals)
    console.log('asyncCall 2')
  },
  createCalendar: (locals) => {
    console.log('createCalendar 1')    
    let newCalendar = new Calendar({ userId: locals.user.id })
    console.log('createCalendar 2')    
    newCalendar.save((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      console.log('createCalendar 3')      
    })
    console.log('createCalendar 4')    
  },
}