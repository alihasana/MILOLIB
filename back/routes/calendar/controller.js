import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import Calendar from './model'
import helper from './../../helpers/helper'
import controller from './controller'

export default {

  checkSlotsConflict: (arr, val) => {
    return arr.some(function (arrElement) {
      if (val.start === arrElement.start) {
        return arrElement.available === false
        // TODO : test de suprimmer 'val', puis test de suprimmer 'req.body[key]'
        // TODO : si ça ne fonctionne pas, tester une boucle suplementaire findIndex()
        // Lien utile : https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
      }
    })
  },

  checkSlotsConflictWIP: (arr, val) => {
    return arr.some(function (arrElement) {
      return 
    })
  },

  deleteDuplicateSlotsWIP: (arr, val) => {
    return arr.some(function (arrElement) {
      return val === arrElement.start
    })
  },

  createCalendar: (locals) => {
    let newCalendar = new Calendar({})
    return newCalendar.save()
  },

  postCalendar(req, res, calendar) {
    // Verify slots conflicts 

    for (let key of Object.keys(req.body)) {
      if (controller.checkSlotsConflict(calendar.slots, req.body[key])) {
        return res.status(400).json({ success: false, message: 'Your slots request conflict with slots already present in the calendar' })
      }
    }
    

    // //              WIP

    // console.log('A')
    // for (let bodyKey of Object.keys(req.body)) {
    //   console.log('B')
    //   for (let slotsKey of Object.keys(calendar.slots)) {
    //     console.log('C')
    //     if (req.body[bodyKey].start === calendar.slots[slotsKey].start) {
    //       console.log('D')
    //       if (calendar.slots[slotsKey].available === false) {
    //         console.log('E 1')
    //         return res.status(400).json({ success: false, message: 'Your slots request conflict with slots already present in the calendar' })
    //       } else {
    //         console.log('E 2')
    //         calendar.slots[slotsKey] = undefined
    //         // calendar.slots.splice(slotsKey, 1)
    //       }
    //     }
    //   }
    // }


    // if (req.body[key].start === arrElement.start) {
    //   calendar.slots[key].start
    // }

    // for (let key of Object.keys(req.body)) {
    //   if (controller.deleteDuplicateSlotsWIP(calendar.slots, req.body[key].start)) {
    //     calendar.slots[key].start
    //   }
    // }


    // for (let key of Object.keys(req.body)) {
    //   if (controller.checkSlotsConflictWIP(calendar.slots, req.body[key].start)) {
        
    //   }
    // }

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

  // asyncCall: async function (locals) {
  //   console.log('asyncCall 1')
  //   // let result = await createCalendar(locals)
  //   // return result
  //   return await controller.createCalendar(locals)
  //   console.log('asyncCall 2')
  // },

  // createCalendar: (locals) => {
  //   console.log('createCalendar 1')
  //   let newCalendar = new Calendar({ userId: locals.user.id })
  //   console.log('createCalendar 2')
  //   return newCalendar.save( (err, calendar) => {
  //     if (err) return res.status(500).json({ success: false, message: 'lol' + err.message })
  //   })
  // },

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

