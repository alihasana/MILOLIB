import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let ClientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, default: 'peon' },
    prenom: { type: String, required: false },
    nom: { type: String, required: false },
    phone: { type: String },
    descolarise: { type: Boolean, required: false },
    infAge: { type: Boolean, required: false },
    commune: String,
  },
  { timestamps: true }
)

ClientSchema.methods.comparePasswords = function(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password)
}

export default mongoose.model('Client', ClientSchema)
