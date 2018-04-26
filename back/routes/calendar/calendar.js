// WARNING WIP !!!
import express from 'express'
import mongoose from 'mongoose'
import User from './../users/model'
import Client from './../clients/model'
import Calendar from './model'
import controller from './controller'
import util from 'util'

let router = express.Router()

router.post('/', (req, res) => {
  // console.log('Le req.body ' + req.body)
  console.log('Le req.body ' + JSON.stringify(req.body, null, 4))
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    // console.log('Le calendar NON modifié ' + calendar)
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      if (!calendar) { // Create calendar if needed
        let newCalendar = new Calendar({ userId: user._id })
        newCalendar.save((err, calendar) => {
          if (err) return res.status(500).json({ success: false, message: err.message })
        })
      }

      // TODO : tester le filtre slots
      for (let key of Object.keys(req.body)) {
        if (controller.checkSlotsConflict(calendar, req.body[key].start)) {
          return res.status(400).json({ success: false, message: 'Your slots request conflict with slots already present in the calendar' })
        }
      }

      for (let key of Object.keys(req.body)) {
        calendar.slots.push(req.body[key])
      }

      console.log('Le calendar modifié ' + calendar)

      calendar.save((err) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées', content: 'TEST ' + calendar.slots })
      })
    }
  })
})


router.get('/', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
    else {
      // TODO : filtrer les slots not available
      // calendar.populate('userId')
      // res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
      calendar.populate('userId').execPopulate(function (err, calendar) {
      })
      res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
    }
  })
})


//Populate test
router.get('/test', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }).populate('userId').exec((err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
    res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
  })
})

// router.get('/test', (req, res) => {
//   Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
//     if (err) res.status(500).json({ success: false, message: err.message })    
//     else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
//     else {
//       // calendar.populate('userId').exec((err, result) => {
//       //     console.log("Populated citron " + result)
//       //   })
//       res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
//     }
//   }).populate('userId')
// })

// router.get('/test', (req, res) => {
//   Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
//     if (err) res.status(500).json({ success: false, message: err.message })    
//     else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
//   }).populate('userId').exec((err, result) => {
//     res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
//   })
// })



// OSEF -->

// router.get('/:id', (req, res) => {
//   if (res.locals.user.calendar.slots.id(req.params.id) != null) {
//     res.status(200).json({ success: true, message: 'Your slot, you ding dong.', content: res.locals.user.calendar.slots.id(req.params.id) })
//   } else res.status(404).json({ success: false, message: 'Slot not found.' })
// })


// router.put('/:id', (req, res) => { // one slot change
//   if (res.locals.user.calendar.slots.id(req.params.id) != null) {
//     res.locals.user.calendar.slots.available = !res.locals.user.calendar.slots.available
//   } else res.status(404).json({ success: false, message: 'Slot not found.' })
// })


// router.put('/', (req, res) => { // multiples slots change

// })


// router.post('/test', (req, res) => {
//   console.log(req.body)
//   console.log('Object.keys : ' + Object.keys(req.body))
//   console.log('LENGHT : ' + req.body.length)
// for (let i = 0; i < req.body.length; i++) {
//   calendar.slots.push(req.body[i])
// }
// for (let key of Object.keys(req.body)) {
//   calendar.slots.push(req.body[key])
// }
// var arr = []
// for (let i = 0; i < req.body.length; i++) {
//   arr.push(req.body[i])
// }
// console.log('LE ARRAY MA GEULE ' + arr)

//   res.locals.user.markModified('calendar.slots.start')
//   res.locals.user.markModified('calendar.slots.end')

//   res.locals.user.save((err) => {
//     if (err) res.status(500).json({ success: false, message: err.message })
//     else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées' })
//   })
// })

export default router
