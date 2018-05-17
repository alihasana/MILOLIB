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


router.post('/', (req, res) => {
  // console.log('Le req.body ' + JSON.stringify(req.body, null, 4))
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
    if (err) return res.status(500).json({ success: false, message: err.message })

    // TODO : a retest, aprés création du calendar le 'controller.postCalendar(req, res, calendar)' ne marche pas.
    if (!calendar) { // Create calendar if needed
      controller.createCalendar(res.locals)
        .then(function (calendar) {
          controller.postCalendar(req, res, calendar)
        })
        .catch(err => {
          return res.status(500).json({ success: false, message: err.message })
        })
    } else controller.postCalendar(req, res, calendar)
  })
})

router.get('/', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id })
    .populate('slots.appointment.appointmentId', 'appointmentType')
    .exec((err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

      res.status(200).json({ success: true, message: 'Your calendar.', content: calendar })
    })
})

router.get('/appointmentTypes', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }, appointmentTypes, (err, calendar) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

    res.status(200).json({ success: true, message: 'Appointment types list', content: calendar.appointmentTypes })
  })
})


router.put('/appointmentTypes', (req, res) => {
  Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
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
    calendar.save(err => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      res.status(200).json({ success: true, message: 'Appointment Types modifiés' })
    })
  })
})

router.get('/appointment/:slotId', (req, res) => {
  console.log('reqpparam:', req.params);
  if (!ObjectId.isValid(req.params.slotId)) return res.status(400).json({ success: false, message: 'Invalid ID' })
  Appointment.findOne({ "slots._id": req.params.slotId })
    .populate('participants.clients') // TODO: VIRER LE PASSWORD de façon global (schema)
    .populate('participants.staff') // TODO: VIRER LE PASSWORD de façon global (schema)
    .exec((err, appointment) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      else if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' })

      helper.beforeSendUser(appointment.participants.staff)
      helper.beforeSendUser(appointment.participants.clients)
      // // Boucle pour rdv de groupe
      // for (let key of Object.keys(appointment.participants.clients)) {
      //   helper.beforeSendUser(appointment.participants.clients[key])
      // }

      console.log('L4APPOUOUNH: ', appointment)
      res.status(200).json({ success: true, message: 'Your appointment.', content: appointment })
    })
})


router.post('/appointment', (req, res) => {
  console.log('req.body: ', req.body);
  // req.body est un array d'id de slots OU array de dates ? + id du calendar.
  // id du calendar en params ? peut être, je sais pas
  // req.body = {
  //   mailClient: String, // a comparer pour trouver l'id
  //   slotsId: [String],
  //   appointmentType: String,
  // }
  // findById avec le calendar id OU findOne avec le userID ?
  // TODO: rdv existe déja dans le cas d'un rdv de groupe, créer une route differente pour ce cas.

  if (!req.body && !req.body.slotsId && !req.body.slotsId[0] && req.body.appointmentType) {
    return res.status(400).json({ success: false, message: 'Bad request' })
  }

  Client.findOne({ email: helper.caseInsensitive(req.body.mailClient) }, (err, client) => {
    if (err) return res.status(500).json({ success: false, message: err.message })
    else if (!client) return res.status(404).json({ success: false, message: 'Bad email, client not found' })

    Calendar.findOne({ userId: res.locals.user.id }, (err, calendar) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })


      var appointmentSlots = []
      var appointmentId = new ObjectId()
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
            appointmentId: appointmentId,
            // appointmentType: req.body.appointmentType.name, // TODO: A virer, outdated
          }
          // Add slot to 'appointmentSlots' array
          appointmentSlots.push(calendar.slots.id(req.body.slotsId[key]))
        } else return res.status(400).json({ success: false, message: 'Cannot create appointement, Slots not found' })
      }

      calendar.save((err, calendar) => {
        if (err) return res.status(500).json({ success: false, message: err.message })
        let newAppointment = new Appointment({
          _id: appointmentId,
          appointmentType: req.body.appointmentType,
          participants: {
            clients: client.id, // TODO: a changer en array si rdv de groupe
            staff: res.locals.user.id,
          },
          slots: appointmentSlots,
          description: req.body.description,
        })

        newAppointment.save((err, appointment) => {
          if (err) return res.status(500).json({ success: false, message: err.message })
          res.locals.user.appointments.push(appointment.id)

          res.locals.user.save(err => {
            if (err) return res.status(500).json({ success: false, message: err.message })
            client.appointments.push(appointment.id)
            client.save(err => {

              if (err) return res.status(500).json({ success: false, message: err.message })
              res.status(200).json({ success: true, message: 'New Appointment successfully created!', content: appointment })
            })
          })
        })
      })
    })
  })
})


router.delete('/appointment/:appointmentId', (req, res) => {
  if (!ObjectId.isValid(req.params.appointmentId)) return res.status(400).json({ success: false, message: 'Invalid ID' })
  Appointment.findById(req.params.appointmentId)
    .populate('participants.clients') // TODO: VIRER LE PASSWORD de façon global (schema)
    .populate('participants.staff') // TODO: VIRER LE PASSWORD de façon global (schema)
    .exec((err, appointment) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      else if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' })

      if (appointment.participants.staff._id != res.locals.user.id) {
        if (res.locals.user.role != 'Chargé d\'accueil') return res.status(403).json({ succes: false, message: 'Forbidden.' })
      }

      Calendar.findOne({ userId: appointment.participants.staff._id }, (err, calendar) => {
        if (err) return res.status(500).json({ success: false, message: err.message })
        else if (!calendar) return res.status(404).json({ success: false, message: 'Calendar not found' })

        // // Le ' for (let key of Object.keys(appointment.slots)) ' ne fonctionne pas,
        // // pourquoi ? Le console.log 'ICI' montre qu'aprés avoir parcouru l'array,
        // // il fait un loop avec un objet 'null'. étrange :o .
        // for (let key of Object.keys(appointment.slots)) {
        //   console.log('ICI ', calendar.slots.id(appointment.slots[key]._id))
        //   if (calendar.slots.id(appointment.slots[key]._id) != null) {
        //     calendar.slots.id(appointment.slots[key]._id).available = true
        //     calendar.slots.id(appointment.slots[key]._id).appointment = undefined
        //   } else {
        //     return res.status(400).json({ success: false, message: 'Cannot delete appointement, Slots not found' })
        //   }
        // }

        for (let i = 0; i < appointment.slots.length; i++) {
          // console.log('ICI ', calendar.slots.id(appointment.slots[i]._id))
          if (calendar.slots.id(appointment.slots[i]._id) != null) {
            calendar.slots.id(appointment.slots[i]._id).available = true
            calendar.slots.id(appointment.slots[i]._id).appointment = undefined
          } else {
            return res.status(400).json({ success: false, message: 'Cannot delete appointement, Slots not found' })
          }
        }

        calendar.save(err => {
          if (err) return res.status(500).json({ success: false, message: err.message })

          User.findById(appointment.participants.staff._id, (err, user) => {
            if (err) return res.status(500).json({ success: false, message: err.message })
            else if (!user) return res.status(404).json({ success: false, message: 'User not found' })

            user.appointments.splice(user.appointments.indexOf(appointment.id), 1)
            user.save(err => {
              if (err) return res.status(500).json({ success: false, message: err.message })

              //TODO : rajouter une boucle pour gerer plusieurs clients (dans le cas de rdv de groupe)
              Client.findById(appointment.participants.clients._id, (err, client) => {
                if (err) return res.status(500).json({ success: false, message: err.message })
                else if (!client) return res.status(404).json({ success: false, message: 'Client not found' })

                client.appointments.splice(client.appointments.indexOf(appointment.id), 1)
                client.save(err => {
                  if (err) return res.status(500).json({ success: false, message: err.message })

                  Appointment.deleteOne({ _id: req.params.appointmentId }, (err) => {
                    if (err) return res.status(500).json({ success: false, message: err.message })
                    res.status(200).json({ success: true, message: 'Appointment deleted' })
                  })
                })
              })
            })
          })
        })
      })
    })
})

// // -------------------------------------------------------------------
// //                        NON FONCTIONNELS 
// // -------------------------------------------------------------------

// // router.get('slots/:id', (req, res) => {
// //   if (res.locals.user.calendar.slots.id(req.params.id) != null) {
// //     res.status(200).json({ success: true, message: 'Your slot, you ding dong.', content: res.locals.user.calendar.slots.id(req.params.id) })
// //   } else res.status(404).json({ success: false, message: 'Slot not found.' })
// // })

// // // Dans le front un truc du genre: 
// // // On cliques sur les slots que l'on veux modifier, ils se push dans un array qui est ensuite envoyer au back quand on clique sur un bouton "Modify".
// // router.put('/slots', (req, res) => { // multiples slots change
// // })

export default router
