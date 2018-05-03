import mongoose from 'mongoose'
import SlotSchema from '../../schema/slot'

let CalendarSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, sparse: true, ref: 'User' },
    slots: [SlotSchema],
    appointmentTypes: [{
      _id: false,
      name: { type: String },
      duration: { type: String } // TODO: duration en nombres de slots plutot qu'en minutes ?
    }],
  },
  { timestamps: true }
)

export default mongoose.model('Calendar', CalendarSchema)
