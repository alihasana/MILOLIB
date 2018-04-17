import mongoose from 'mongoose'

let AppointmentTypeSchema = new mongoose.Schema({
  duration : { type: String},
  type : { type: String},
  consellorId : { type: String}
},
{
  timestamps: true
})


export default mongoose.model('AppointmentType', AppointmentTypeSchema)