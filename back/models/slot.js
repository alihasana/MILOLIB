// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
  start: [] ,
  end: [] ,
  status: String ,
})



export default mongoose.model('Slot', SlotSchema)