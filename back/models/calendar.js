// WARNING WIP !!!
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Slot from './slot'

let CalendarSchema = new mongoose.Schema({
  availabilitySlots: [Slot],
  config: [], // Les types de rdv possibles et leur durées
})

export default mongoose.model('Calendar', CalendarSchema)