import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashPassword: { type: String, required: true },
  role: { type: String, required: true, default: 'peon' },
  firstName: { type: String },
  lastName: { type: String },
  creationDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
})

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.hashPassword)
}

export default mongoose.model('User', UserSchema)