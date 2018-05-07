import mongoose from 'mongoose'
import SlotSchema from './../schema/slot'

let AppointmentSchema = new mongoose.Schema(
  {
    appointmentType: {
      _id: false,
      name: { type: String },
      duration: { type: String } // TODO: duration en nombres de slots plutot qu'en minutes ?
    },
    participants: {
      clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
      staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    slots: [SlotSchema],
    description: { type: String, maxlength: 4132 },
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', AppointmentSchema)
