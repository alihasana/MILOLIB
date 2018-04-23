// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
	clientID: String,
	conseillerID: String,
	// rdvID: String, A voir comment creer un id unique
	start: mongoose.Schema.Types.Mixed,
	end: mongoose.Schema.Types.Mixed,
	available: { type: Boolean, required: true, default: true },
	status: String
})

export default SlotSchema
