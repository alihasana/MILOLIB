// WARNING WIP !!!
import mongoose from 'mongoose'
import SlotSchema from './slot'

let CalendarSchema = new mongoose.Schema({
  eventsTypes: [{}], // Les types de rdv possibles et leur durées
  slots: [SlotSchema]
})

export default CalendarSchema