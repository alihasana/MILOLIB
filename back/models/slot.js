// WARNING WIP !!!
import mongoose from 'mongoose'

let SlotSchema = new mongoose.Schema({
  start: [] ,
  end: [] ,

  // status: { type: String, required: true, default: 'availaibe' }, //
                                // OR
  // availaibe: { type: Boolean, required: true, default: true }, //
  // status: { type: String }, //
})



export default mongoose.model('Slot', SlotSchema)