// WARNING WIP !!!
import mongoose from 'mongoose'
import SlotSchema from './slot'

let CalendarSchema = new mongoose.Schema({
  eventsTypes: [{
    type: { type: String },
    duration: { type: String }
  }], // Les types de rdv possibles et leur durées
  slots: [SlotSchema]
})

export default CalendarSchema