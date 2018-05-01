import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Client from './model'
import User from './../users/model'
import Calendar from './../calendar/model'
import Appointment from './../../models/appointment'
import helper from './../../helpers/helper'

import profile from './profile/profile' 
let router = express.Router()
router.use('/profile', profile) // TODO: A test

// WIP
router.get('/appointment/:appointmentType', (req, res) => {
  Calendar.find({ appointmentTypes: { name: req.params.appointmentType } }, (err, calendars) => {
  // Calendar.find({}, (err, calendars) => { // Find({}) for test purpose 
    console.log('A1' + calendars)
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!calendars || !calendars[0]) return res.status(404).json({ success: false, message: 'No calendars found' })
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
    // TODO : faire un filtre cohérent, pas juste renvoyer le premier arbitrairement
    res.status(200).json({ success: true, message: 'Calendars with available appointments.', content: calendars[0] })
  })
})

// WIP
router.post('/appointment', (req, res) => {
  // req.body est un array d'id de slots OU array de dates ? + id du calendar.
  // id du calendar en params ? peut être, je sais pas
  // req.body = {
  //   calendarId: String,
  //   slotsId: [String],
  //   appointmentType: String,
  // }
  // findById avec le calendar id OU findOne avec le userID ?
  // TODO: rdv existe déja dans le cas d'un rdv de groupe, créer une route differente pour ce cas.
  Calendar.findById(req.body.calendarId, (err, calendar) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

    if (!req.body && !req.body.slotsId && !req.body.slotsId[0]) {
      return res.status(400).json({ success: false, message: 'Bad request' })
    }

    var appointmentSlots = []
    for (let key of Object.keys(req.body.slotsId)) {
      if (calendar.slots.id(req.body.slotsId[key]) != null) {
        // Check conflict
        if (calendar.slots.id(req.body.slotsId[key]).available == false) {
          return res.status(400).json({ success: false, message: 'Cannot create appointement, slots unavailable' })
        }
        // Make slot unavailable in calendar
        calendar.slots.id(req.body.slotsId[key]).available = false
        calendar.slots.id(req.body.slotsId[key]).appointment = {
          fullName: res.locals.user.firstName + res.locals.user.lastName,
          appointmentType: req.body.appointmentType,
        }
        // Add slot to 'appointmentSlots' array
        appointmentSlots.push(calendar.slots.id(req.body.slotsId[key]))
      }
    }

    calendar.save((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      let newAppointment = new Appointment({
        appointmentType: req.body.appointmentType,
        participants: {
          clients: [res.locals.user.id], // TODO: verif si array nécessaires
          staff: calendar.userId,
        },
        slots: appointmentSlots,
      })

      newAppointment.save((err, appointment) => {
        if (err) return res.status(500).json({ success: false, message: err.message })
        res.status(200).json({ success: true, message: 'New Appointment successfully created!', content: appointment })
      })
    })
  })
})

export default router