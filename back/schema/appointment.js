import mongoose from 'mongoose'
import SlotSchema from './slot'

let AppointmentSchema = new mongoose.Schema(
  {
    // appointmentType: {
    //   name: { type: String },
    //   duration: { type: String }
    // },
    appointmentType: String,
    participants: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    slots: [SlotSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', AppointmentSchema)
