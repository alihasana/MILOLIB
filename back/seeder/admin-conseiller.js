import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let adminConseillerSeed = new Promise((resolve, reject) => {
  let adminConseillers = [
    new User({
      email: 'admin-conseiller',
      password: bcrypt.hashSync('admin-conseiller', 10),
      role: 'Administrateur/Conseiller',
      calendar: {}, // WIP calendar, a voir si on fait comme ça à terme
    })
  ]
  
  //First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
  let done = 0
  for (let i = 0; i < adminConseillers.length; i++) {
    adminConseillers[i].save((err, result) => {
      done++
      if (done === adminConseillers.length) {
        console.log("Administrateur/Conseillers seeding complete. Yeah (づ｡◕‿◕｡)づ !")
        resolve(true)
      }
    })
  }
})

export default adminConseillerSeed