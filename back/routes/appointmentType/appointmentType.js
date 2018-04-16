import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import AppointmentType from './model'
import helper from '../../helpers/helper'
const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

router.post('/appointmentType', (req, res, next) => {
  const appointmentType = new AppointmentType({
    duration: req.body.duration,
    type: req.body.type,
    consellorId: res.locals._id
  })
  appointmentType.save()
    .then(res.status(200).send({ success: true }))
    .catch((err) => {
      res.status(500).send(err.errmsg)
    })
}
)

export default router
