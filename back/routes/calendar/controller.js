import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import Calendar from './model'
import helper from './../../helpers/helper'
import controller from './controller'

export default {
  checkSlotsConflict: (arr2, val) => {
    return arr2.some(function (arr2Element) {
      return val === arr2Element.start
    })
  },
  // WIP, not working
  asyncCall: async function(locals) {
    console.log('asyncCall 1')
    // let result = await createCalendar(locals)
    // return result
    return await createCalendar(locals)
    console.log('asyncCall 2')
  },
  // createCalendar: (locals) => {
  //   return new Promise((resolve, reject) => {
  //     console.log('createCalendar 1')
  //     let newCalendar = new Calendar({ userId: locals.user.id })
  //     console.log('createCalendar 2')
  //     resolve('test ;)')
  //     newCalendar.save((err, calendar) => {
  //       if (err) reject(err.message)
  //       // if (err) return res.status(500).json({ success: false, message: err.message })
  //       console.log('createCalendar 3')
  //       resolve(calendar)
  //     })
  //     // console.log('createCalendar 4')
  //   })
  // },
}
    function createCalendar(locals) {
      return new Promise((resolve, reject) => {
        console.log('createCalendar 1')
        let newCalendar = new Calendar({ userId: locals.user.id })
        console.log('createCalendar 2')
        // resolve('test ;)')
        newCalendar.save((err, calendar) => {
          if (err) reject(err.message)
          // if (err) return res.status(500).json({ success: false, message: err.message })
          console.log('createCalendar 3')
          resolve(calendar)
        })
        // console.log('createCalendar 4')
      })
    }