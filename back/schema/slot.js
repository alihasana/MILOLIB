// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
  start: mongoose.Schema.Types.Mixed,
  end: mongoose.Schema.Types.Mixed,
  available: { type: Boolean, required: true, default: true },
  // status: { type: String },
  // OR
  // status: { type: String, required: true, default: 'available' },
})

export default SlotSchema