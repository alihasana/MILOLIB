// WARNING WIP !!!
import express from 'express'
import mongoose from 'mongoose'
// import User from './../users/model'

let router = express.Router()

router.post('/', (req, res) => {
  for (let key of Object.keys(req.body)) {
    res.locals.user.calendar.slots.push(req.body[key])
  }
  res.locals.user.calendar.slots.markModified('start')
  res.locals.user.calendar.slots.markModified('end')

  res.locals.user.save((err) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées' })
  })
})

export default router