import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let ClientSchema = new mongoose.Schema(
  {
    nom: { type: String, required: false },
    prenom: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    descolarise: { type: Boolean, required: false },
    infAge: { type: Boolean, required: false },
    commune: String,
    role: String
    // eventsTypes: [{}], // Les types de rdv possibles et leur durées
    // creationDate: { type: Date, default: Date.now },
    // updatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

ClientSchema.methods.comparePasswords = function(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password)
}

export default mongoose.model('Client', ClientSchema)
