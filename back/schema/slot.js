// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
	start: { type: String },
	end: { type: String },
	available: { type: Boolean, required: true, default: true },
  appointment: {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    fullName: String,
    appointmentType: String, // TODO: A virer car superflu avec poupulate. virer aussi dans POST.
  }
})

export default SlotSchema
