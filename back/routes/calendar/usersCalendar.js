import express from 'express'
import mongoose from 'mongoose'
import User from './../users/model'
import Client from './../clients/model'
import Calendar from './model'
import Appointment from './../../models/appointment'
import controller from './controller'
import helper from '../../helpers/helper'
const ObjectId = mongoose.Types.ObjectId
// import util from 'util'

let router = express.Router()


router.post('/:userId', (req, res) => {
  if (res.locals.user.role != 'Chargé d\'accueil') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (!ObjectId.isValid(req.params.userId)) return res.status(400).json({ success: false, message: 'Invalid ID' })

  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

    controller.postCalendar(req, res, calendar)
  })
})


router.get('/:userId', (req, res) => {
  console.log(('req.body calendar', req.body))
  if (res.locals.user.role != 'Chargé d\'accueil') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (!ObjectId.isValid(req.params.userId)) return res.status(400).json({ success: false, message: 'Invalid ID' })
console.log('voici le user id: ', userId)
  Calendar.findOne({ userId: req.params.userId })
    .populate('userId')
    .exec((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

      helper.beforeSendUser(calendar.userId)
      res.status(200).json({ success: true, message: 'Calendar of ' + calendar.userId.email, content: calendar })
      console.log('here is user calendar', calendar)
    })
})


router.get('/:userId/appointmentTypes', (req, res) => {
  if (res.locals.user.role != 'Chargé d\'accueil') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (!ObjectId.isValid(req.params.userId)) return res.status(400).json({ success: false, message: 'Invalid ID' })  

  Calendar.findOne({ userId: req.params.userId }, appointmentTypes, (err, calendar) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

    res.status(200).json({ success: true, message: 'Appointment types list', content: calendar.appointmentTypes })
  })
})


router.put('/:userId/appointmentTypes', (req, res) => {
  if (res.locals.user.role != 'Chargé d\'accueil') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (!ObjectId.isValid(req.params.userId)) return res.status(400).json({ success: false, message: 'Invalid ID' })  

  Calendar.findOne({ userId: req.params.userId }, (err, calendar) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

    if (!req.body && !req.body[0]) {
      return res.status(400).json({ success: false, message: 'Bad request' })
    }

    for (let key of Object.keys(req.body)) {
      if (!req.body[key].name && !req.body[key].duration) {
        return res.status(400).json({ success: false, message: 'Bad request' })
        // TODO: duration en nombres de slots plutot qu'en minutes ?
      }
    }

    calendar.appointmentTypes = req.body
    calendar.save((err) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      res.status(200).json({ success: true, message: 'Appointment Types modifiés'})
    })
  })
})


router.post('/:userId/appointment', (req, res) => {
  if (res.locals.user.role != 'Chargé d\'accueil') return res.status(403).json({ succes: false, message: 'Forbidden.' })
  if (!ObjectId.isValid(req.params.userId)) return res.status(400).json({ success: false, message: 'Invalid ID' })  

  Client.findOne({ email: req.body.mailClient }, (err, client) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!client) return res.status(404).json({ success: false, message: 'Bad email, client not found' })

    Calendar.findOne({ userId: req.params.userId }, (err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

      if (!req.body && !req.body.slotsId && !req.body.slotsId[0] && req.body.appointmentType) {
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
            fullName: client.firstName + ' ' + client.lastName,
            // fullName: client.firstName,
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
            clients: [client.id], // TODO: verif si array nécessaires
            staff: req.params.userId,
          },
          slots: appointmentSlots,
          description: req.body.description,
        })

        newAppointment.save((err, appointment) => {
          if (err) return res.status(500).json({ success: false, message: err.message })
          res.status(200).json({ success: true, message: 'New Appointment successfully created!', content: appointment })
        })
      })
    })
  })
})

export default router
