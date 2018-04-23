import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, default: 'peon' },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String }
    // eventsTypes: [{}], // Les types de rdv possibles et leur durées
  },
  { timestamps: true }
)

UserSchema.methods.comparePasswords = function(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password)
}

export default mongoose.model('User', UserSchema)
