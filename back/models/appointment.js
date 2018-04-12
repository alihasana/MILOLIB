// WARNING WIP !!!
import mongoose from 'mongoose'
import Slot from './slot'

let AppointmentSchema = new mongoose.Schema({
  slots: [Slot]
})

export default mongoose.model('Appointment', AppointmentSchema)