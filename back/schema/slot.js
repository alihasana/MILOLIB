// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
	start: { type: String },
	end: { type: String },
	available: { type: Boolean, required: true, default: true },
  appointment: {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    fullName: String,
    appointmentType: String,
  }
})

export default SlotSchema
