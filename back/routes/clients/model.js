import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let ClientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'no role' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    descolarise: { type: Boolean, required: false }, // TODO: database ou non ?
    infAge: { type: Boolean, required: false },  // TODO: database ou non ?
    commune: String,
    appointments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Appointment' },    
  },
  { timestamps: true }
)

ClientSchema.methods.comparePasswords = function(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password)
}

export default mongoose.model('Client', ClientSchema)
