// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
	// start: { type: String },
	// end: { type: String },
	start: mongoose.Schema.Types.Mixed,
	end: mongoose.Schema.Types.Mixed,
	available: { type: Boolean, required: true, default: true },
	// status: String
})

export default SlotSchema
