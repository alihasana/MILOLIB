// WARNING WIP !!!
import mongoose from 'mongoose'
import SlotSchema from './slot'

let AppointmentSchema = new mongoose.Schema({
  slots: [SlotSchema],
  othersInfosWIP: {},
})

export default AppointmentSchema