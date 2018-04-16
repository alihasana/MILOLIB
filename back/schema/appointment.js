// WARNING WIP !!!
import mongoose from 'mongoose'
import SlotSchema from './slot'

let AppointmentSchema = new mongoose.Schema({
  slots: [SlotSchema]
})

export default AppointmentSchema