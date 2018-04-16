// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
  start: String ,
  end: String ,
  available: { type: Boolean, required: true, default: true },
  // status: { type: String },
  // OR
  // status: { type: String, required: true, default: 'available' },
})

export default SlotSchema