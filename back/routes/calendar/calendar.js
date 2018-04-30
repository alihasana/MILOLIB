import express from 'express'
import mongoose from 'mongoose'
import User from './../users/model'
import Client from './../clients/model'
import Calendar from './model'
import controller from './controller'
// import util from 'util'

let router = express.Router()

router.post('/', (req, res) => {
  // console.log('Le req.body ' + JSON.stringify(req.body, null, 4))
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      console.log('Le calendar find one ' + JSON.stringify(calendar, null, 4))

      // if (!calendar) { // Create calendar if needed
      //   controller.asyncCall(res.locals)
      // }

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
      // console.log('Le calendar modifié ' + JSON.stringify(calendar, null, 4))

      // TODO: A voir si 'content: calendar' ou si pas besoin de content dans la réponse.
      calendar.save((err, calendar) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées', content: calendar })
      })
    }
  })
})


router.get('/', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
    else {
      // TODO: A voir comment filter les slots lors du .find()
      // Filtre provisoire
      for (let key of Object.keys(calendar.slots)) {
        if (calendar.slots[key].available !== true) {
          delete calendar.slots[key]
        }
      }
      // TODO: add 'Appointments' list and merge it with calendar before send.
      res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
    }
  })
})

router.get('/testFind', (req, res) => {
  Calendar.find({}, (err, calendars) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendars) res.status(404).json({ success: false, message: 'Calendars not found' })
    else {
      // TODO : filtrer les slots not available
      res.status(200).json({ success: true, message: 'Calendars with available appointments.', content: calendars })
    }
  })
})

router.put('/appointmentTypes', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
    else {
      calendar.appointmentTypes = req.body
      calendar.save((err) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'C\'est ok. Appointment Types modifiés' })
      })
    }
  })
})

// -------------------------------------------------------------------
//                        NON FONCTIONNELS 
// -------------------------------------------------------------------

// Appointment Types: dont know wat im doing :D
router.put('/lol', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
    else {
      for (let i = 0; i < req.body.length; i++) {
        calendar.appointmentTypes.push(req.body[i])
      }
      calendar.save((err) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'C\'est ok. Appointment Types ajoutées' })
      })
    }
  })
})

router.put('/lol2', (req, res) => {
  if (req.body.active) {
    User.findByIdAndUpdate(req.params.id, { active: req.body.active }, (err, user) => {
      if (err) {
        if (err.message.match(/^Cast to ObjectId failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid ID' })
        }
        else if (err.message.match(/^Cast to boolean failed.+/)) {
          res.status(400).json({ success: false, message: 'Invalid request.' })
        } else res.status(500).json({ success: false, message: err.message })
      }
      else if (!user) res.status(404).json({ success: false, message: 'User not found.' })
      else {
        if (req.body.active == 'true') res.status(200).json({ success: true, message: 'User ' + user.email + ' reactivated =D' })
        else if (req.body.active == 'false') res.status(200).json({ success: true, message: 'User ' + user.email + ' deactivated =\'(' })
      }
    })
  } else res.status(400).json({ success: false, message: 'Invalid request.' })
})


//Populate test
router.get('/testPopulate', (req, res) => {
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

// router.get('slots/:id', (req, res) => {
//   if (res.locals.user.calendar.slots.id(req.params.id) != null) {
//     res.status(200).json({ success: true, message: 'Your slot, you ding dong.', content: res.locals.user.calendar.slots.id(req.params.id) })
//   } else res.status(404).json({ success: false, message: 'Slot not found.' })
// })

// // Route inutile ? 'multiples slots change' est suffisant
// router.put('/slots/:id', (req, res) => { // one slot change
// })

// // Dans le front un truc du genre: 
// // On cliques sur les slots que l'on veux modifier, ils se push dans un array qui est ensuite envoyer au back quand on clique sur un bouton "Modify".
// router.put('/slots', (req, res) => { // multiples slots change
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
