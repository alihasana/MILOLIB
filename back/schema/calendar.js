// WARNING WIP !!!
import mongoose from 'mongoose'
import SlotSchema from './slot'

let CalendarSchema = new mongoose.Schema({
  slots: [SlotSchema],
  eventsTypes: [] // Les types de rdv possibles et leur durées
})

export default CalendarSchema