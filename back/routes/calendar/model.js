import mongoose from 'mongoose'
import SlotSchema from '../../schema/slot'

let CalendarSchema = new mongoose.Schema(
	{
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, sparse: true, ref: 'User' },
		slots: [SlotSchema],
    eventsTypes: [{
        name: { type: String },
        duration: { type: String }
      }],
	},
	{ timestamps: true }
)

export default mongoose.model('Calendar', CalendarSchema)
