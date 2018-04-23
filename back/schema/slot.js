// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
	clientID: String,
	// conseillerID: String, Probablememt a degager
	// rdvID: String,
	start: mongoose.Schema.Types.Mixed,
	end: mongoose.Schema.Types.Mixed,
	available: { type: Boolean, required: true, default: true },
	status: String
})

export default SlotSchema
