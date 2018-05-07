import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import Calendar from './model'
import helper from './../../helpers/helper'
import controller from './controller'

export default {
  checkSlotsConflict: (arr, val) => {
    return arr.some(function (arrElement) {
      if (val === arrElement.start) {
        return arrElement.available === true
      }
      // return val === arrElement.start
    })
  },
  // WIP, not working

  asyncCall: async function (locals) {
    console.log('asyncCall 1')
    // let result = await createCalendar(locals)
    // return result
    return await controller.createCalendar(locals)
    console.log('asyncCall 2')
  },

  // createCalendar: (locals) => {
  //   console.log('createCalendar 1')
  //   let newCalendar = new Calendar({ userId: locals.user.id })
  //   console.log('createCalendar 2')
  //   return newCalendar.save( (err, calendar) => {
  //     if (err) return res.status(500).json({ success: false, message: 'lol' + err.message })
  //   })
  // },

  createCalendar: (locals) => {
    console.log('createCalendar 1')
    let newCalendar = new Calendar({ })
    console.log('createCalendar 2')
    return newCalendar.save()
  },

  postCalendar(req, res, calendar) {
    // Verify slots conflicts 
    for (let key of Object.keys(req.body)) {
      if (controller.checkSlotsConflict(calendar.slots, req.body[key].start)) {
        return res.status(400).json({ success: false, message: 'Your slots request conflict with slots already present in the calendar' })
      }
    }

    // ADD Slots
    for (let key of Object.keys(req.body)) {
      calendar.slots.push(req.body[key])
    }

    // TODO: A voir si 'content: calendar' ou si pas besoin de content dans la réponse.
    calendar.save((err, calendar) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées', content: calendar })
    })
  },
}


// function createCalendar(locals) {
//   console.log('createCalendar 1')
//   let newCalendar = new Calendar({ userId: locals.user.id })
//   console.log('createCalendar 2')
//   // resolve('test ;)')
//   return newCalendar.save;// ((err, calendar) => {
//   // if (err) reject(err.message)
//   // if (err) return res.status(500).json({ success: false, message: err.message })
//   // console.log('createCalendar 3')
//   // resolve(calendar)
// })
//     // console.log('createCalendar 4')
// }

  // return new Promise((resolve, reject) => {
  //       console.log('createCalendar 1')
  //       let newCalendar = new Calendar({ userId: locals.user.id })
  //       console.log('createCalendar 2')
  //       // resolve('test ;)')
  //       newCalendar.save((err, calendar) => {
  //         if (err) reject(err.message)
  //         // if (err) return res.status(500).json({ success: false, message: err.message })
  //         console.log('createCalendar 3')
  //         resolve(calendar)
  //       })
  //       // console.log('createCalendar 4')
  //     })
  //   }

