import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let adminSeed = new Promise((resolve, reject) => {
  let admins = [
    new User({
      email: 'admin',
      password: bcrypt.hashSync('admin', 10),
      role: 'Administrateur',
      calendar: {}, // WIP calendar, a voir si on fait comme ça à terme
    })
  ]

  //First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
  let done = 0
  for (let i = 0; i < admins.length; i++) {
    admins[i].save((err, result) => {
      done++
      if (done === admins.length) {
        console.log("Admins seeding complete. Yeah (づ｡◕‿◕｡)づ !")
        resolve()
      }
    })
  }
})

export default adminSeed