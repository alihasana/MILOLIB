import mongoose from 'mongoose'
import SlotSchema from '../../schema/slot'

let CalendarSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true, unique: true },
		slots: [SlotSchema]
		// eventsTypes: [{}], // Les types de rdv possibles et leur durées
	},
	{ timestamps: true }
)

export default mongoose.model('Calendar', CalendarSchema)
