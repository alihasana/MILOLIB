import mongoose from 'mongoose'

let CalenderTypeSchema = new mongoose.Schema({
  start: { type: Date},
  end: { type: Date},
  status: {type:Boolean, default:false},
  consellorId: { type: String}
},
{
  timestamps: true
})


export default mongoose.model('CalenderType', CalenderTypeSchema)