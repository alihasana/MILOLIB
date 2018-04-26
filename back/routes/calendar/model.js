import mongoose from 'mongoose'
import SlotSchema from '../../schema/slot'

let CalendarSchema = new mongoose.Schema(
	{
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
		slots: [SlotSchema]
		// eventsTypes: [{}], // Les types de rdv possibles et leur durées
	},
	{ timestamps: true }
)

export default mongoose.model('Calendar', CalendarSchema)
