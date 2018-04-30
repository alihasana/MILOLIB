import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Client from './model'
import User from './../users/model'
import Calendar from './../calendar/model'
import Appointment from './../../models/appointment'
import helper from './../../helpers/helper'

let router = express.Router()

// WIP
router.get('/appointment/:appointmentType', (req, res) => {
  // Calendar.find({ appointmentTypes: { name: req.params.appointmentType } }, (err, calendars) => {
  Calendar.find({}, (err, calendars) => { // Find({}) for test purpose 
    console.log('A1' + calendars)
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendars || !calendars[0]) res.status(404).json({ success: false, message: 'No calendars found' })
    else {
      // TODO: A voir comment filter les slots lors du .find()
      // Filtre provisoire
      for (let calendarKey of Object.keys(calendars)) {
        for (let key of Object.keys(calendars[calendarKey].slots)) {
          if (calendars[calendarKey].slots[key].available !== true) {
            // delete calendars[calendarKey].slots[key] // output: null
            calendars[calendarKey].slots.splice(key, 1)
            // calendars[calendarKey].slots[key] = 'lol' // output: 'lol'
            // calendars[calendarKey].slots[key] = null // output: null
            // calendars[calendarKey].slots[key] = undefined // output: null
          }
        }
      }
      console.log('A2' + JSON.stringify(calendars, null, 4))

      // res.status(200).json({ success: true, message: 'Calendars with available appointments.', content: calendars })

      // WIP send first found calendar (au pif, a trier avant les boucles for si on veux opti)
      res.status(200).json({ success: true, message: 'Calendars with available appointments.', content: calendars[0] })
    }
  })
})

// Trés trés WIP
router.post('/appointment', (req, res) => {
  // req.body est un array d'id de slots OU array de dates ? + id du calendar.
  // id du calendar en params ? peut être, je sais pas
  // req.body = {
  //   calendarId: String,
  //   slotsId: [String],
  //   appointmentType: String,
  // }
  // Peut être un array de slots complets, plus simple a save mais je pense au final plus relou a valider.
  // je sais pas, c'est compliqué :D

  // findById avec le calendar id OU findOne avec le userID ?
  // TODO: rdv existe déja dans le cas d'un rdv de groupe, créer une route differente pour ce cas.
  // TODO: virer dans cette route (et dans le reste du projet) les 'else' inutile qui englobent tout le code. 
  // Les remplacer par un 'return' dans la condition pour stopper l'execution.
  Calendar.findById(req.body.calendarId, (err, calendar) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else if (!calendar) res.status(404).json({ success: false, message: 'Calendar not found' })
    else {
      if (!req.body && !req.body.slotsId && !req.body.slotsId[0]) return res.status(400).json({ success: false, message: 'Bad request' })
      console.log(calendar.slots.id(req.body.slotsId[0]))
      var appointmentSlots = []
      for (let key of Object.keys(req.body.slotsId)) {
        if (calendar.slots.id(req.body.slotsId[key]) != null) {  // TODO : verif ecriture condition
          // Check conflict
          if (calendar.slots.id(req.body.slotsId[key]).available == false) {
            return res.status(400).json({ success: false, message: 'Cannot create appointement, slots unavailable' })
          }
          // Make slot unavailable in calendar
          calendar.slots.id(req.body.slotsId[key]).available = false
          // Add slot to 'appointmentSlots' array
          appointmentSlots.push(calendar.slots.id(req.body.slotsId[key]))
        }
      }

      calendar.save((err, calendar) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          let newAppointment = new Appointment({
            appointmentType: req.body.appointmentType,
            participants: [req.locals.user.id],
            slots: appointmentSlots,
          })

          newAppointment.save((err, appointment) => {
            if (err) res.status(500).json({ success: false, message: err.message })
            res.status(200).json({ success: true, message: 'New Appointment successfully created!', content: appointment })
          })
        }
      })
    }
  })
})


// OSEF -->

// router.get('/', (req, res) => {
//   Client.find({}, (err, clients) => {
//     if (err) res.status(500).json({ success: false, message: err.message })
//     else {
//       for (let i = 0; i < clients.length; i++) {
//         helper.beforeSendUser(clients[i])
//       }
//       res.status(200).json({ success: true, message: 'Here is the list of clients!', content: clients })
//     }
//   })
// })

// router.get('/:id', (req, res) => {
//   Client.findById(req.params.id, (err, client) => {
//     if (err) {
//       if (err.message.match(/^Cast to ObjectId failed.+/)) {
//         res.status(400).json({ success: false, message: 'Invalid ID' })
//       } else res.status(500).json({ success: false, message: err.message })
//     } else if (!user)
//       res.status(404).json({ success: false, message: 'User not found.' })
//     else {
//       helper.beforeSendUser(client)
//       res.status(200).json({ success: true, message: 'Here is the client profile!', content: client })
//     }
//   })
// })

export default router