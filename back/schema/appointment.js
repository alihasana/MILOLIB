import mongoose from 'mongoose'
import SlotSchema from './slot'

let AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    participants: [String],
    slots: [SlotSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', AppointmentSchema)
