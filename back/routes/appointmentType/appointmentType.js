import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import AppointmentType from './model'
import helper from '../../helpers/helper'
const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

router.post('/', (req, res, next) => {
  for (let key of Object.keys(req.body)) {
  const appointmentType = new AppointmentType({
    duration: req.body[key].duration,
    type: req.body[key].type,
    consellorId: res.locals.user._id
  }).save()
  .catch((err) => {
    res.status(500).send(err)
  })
  }
  res.status(200).send({ success: true })
}
)

export default router

  // .then(res.status(200).send({ success: true }))
  // .catch((err) => {
  //   res.status(500).send(err.errmsg)
  // })
