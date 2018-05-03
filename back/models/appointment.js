import mongoose from 'mongoose'
import SlotSchema from './../schema/slot'

let AppointmentSchema = new mongoose.Schema(
  {
    // appointmentType: {
    //   name: { type: String },
    //   duration: { type: String }
    // },
    appointmentType: String,
    // participants: { type: [mongoose.Schema.Types.ObjectId] },
    // //                      OU
    // participants: { type: [mongoose.Schema.Types.ObjectId], ref: 'Client' },
    // conseiller: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // //                       OU
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
