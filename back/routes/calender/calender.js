import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Calender from './model'
import helper from '../../helpers/helper'
import moment from "moment";
const ObjectId = mongoose.Types.ObjectId

let router = express.Router()

router.post('/slot', (req, res, next) => {
  for (let key of Object.keys(req.body)) {
    const slot = new Slot({
      start: req.body[key].start,
      end: req.body[key].end,
      consellorId: req.locals._id
    })
    slot.save()
  }
}
)

export default router


  // .then(res.status(200).send({ success: true }))
  // .catch((err) => {
  //   res.status(500).send(err.errmsg)
  // })