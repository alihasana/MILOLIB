// WARNING WIP !!!
import express from 'express'
import mongoose from 'mongoose'
// import User from './../users/model'
// import Client from './../clients/model'
import Calendar from './model'

let router = express.Router()

router.post('/', (req, res) => {
  console.log('Le req.body ' + req.body)
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    console.log('Le calendar non modifié ' + calendar)
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      
      if (!calendar) { // Create calendar if needed
        let newCalendar = new Calendar({ userId: user._id })
        newCalendar.save((err, calendar) => {
          if (err) res.status(500).json({ success: false, message: err.message })
        })
      }
      
      // TODO : filtrer les slots enrengistrer ()
      for (let i = 0; i < req.body.length; i++) {
        calendar.slots.push(req.body[i])
      }
      calendar.markModified('slots.start')
      calendar.markModified('slots.end')
      calendar.save((err) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées' })
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
      res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
    }
  })
})

router.get('/:id', (req, res) => {
  if (res.locals.user.calendar.slots.id(req.params.id) != null) {
    res.status(200).json({ success: true, message: 'Your slot, you ding dong.', content: res.locals.user.calendar.slots.id(req.params.id) })
  } else res.status(404).json({ success: false, message: 'Slot not found.' })
})

router.put('/:id', (req, res) => { // one slot change
  if (res.locals.user.calendar.slots.id(req.params.id) != null) {
    res.locals.user.calendar.slots.available = !res.locals.user.calendar.slots.available
  } else res.status(404).json({ success: false, message: 'Slot not found.' })
})

router.put('/', (req, res) => { // multiples slots change

})

// router.post('/test', (req, res) => {
//   console.log(req.body)
//   console.log('Object.keys : ' + Object.keys(req.body))
//   console.log('LENGHT : ' + req.body.length)
//   // for (let key of Object.keys(req.body)) {
//   //   res.locals.user.calendar.slots.push(req.body[key])
//   // }
//   for (let i = 0; i < req.body.length; i++) {
//     res.locals.user.calendar.slots.push(req.body[i])
//   }

//   res.locals.user.markModified('calendar.slots.start')
//   res.locals.user.markModified('calendar.slots.end')

//   res.locals.user.save((err) => {
//     if (err) res.status(500).json({ success: false, message: err.message })
//     else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées' })
//   })
// })

export default router
