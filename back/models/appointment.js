import mongoose from 'mongoose'
import SlotSchema from './../schema/slot'

let AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    participants: { type: [mongoose.Schema.Types.ObjectId] },
    // //                      OU
    // participants: { type: [mongoose.Schema.Types.ObjectId], ref: 'Client' },
    // conseiller: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // //                       OU
    // participants: {
    //   suivies: { type: [mongoose.Schema.Types.ObjectId], ref: 'Client' },
    //   conseiller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // },
    slots: [SlotSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', AppointmentSchema)
