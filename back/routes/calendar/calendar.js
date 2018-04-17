// WARNING WIP !!!
import express from 'express'
import mongoose from 'mongoose'
// import User from './../users/model'

let router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body)
  console.log('Object.keys : ' +Object.keys(req.body))
  console.log('LENGHT : '+req.body.length)
  // for (let key of Object.keys(req.body)) {
  //   res.locals.user.calendar.slots.push(req.body[key])
  // }
  for (let i = 0; i < req.body.length; i++) {
    res.locals.user.calendar.slots.push(req.body[i])
  }

  res.locals.user.markModified('calendar.slots.start')
  res.locals.user.markModified('calendar.slots.end')

  res.locals.user.save((err) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées' })
  })
})

router.post('/test', (req, res) => {

 
  // for (let key of Object.keys(req.body)) {
  //   res.locals.user.calendar.slots.push(req.body[key])
  // }
  for (let i = 0; i < req.body.length; i++) {
    res.locals.user.calendar.slots.push(req.body[i])
  }

  res.locals.user.markModified('calendar.slots.start')
  res.locals.user.markModified('calendar.slots.end')

  res.locals.user.save((err) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else res.status(200).json({ success: true, message: 'C\'est ok. Slots ajoutées' })
  })
})

export default router