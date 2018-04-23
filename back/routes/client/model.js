import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let ClientSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }
    descolarise: { type: Boolean, required: true },
    >26 : { type: Boolean, required: true },
    commune: String
    // eventsTypes: [{}], // Les types de rdv possibles et leur durées
    // creationDate: { type: Date, default: Date.now },
    // updatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

Client.methods.comparePasswords = function(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password)
}

export default mongoose.model('Client', ClientSchema)
