import User from './../routes/users/model'
import Calendar from './../routes/calendar/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.DB, {}, (err) => {
  if (err) { throw err; } else {
    console.log('Connection to the Database etablished (' + process.env.DB + ')...')
  }
})

let admins = [
  new User({
    email: 'admin',
    password: bcrypt.hashSync('admin', 10),
    role: 'Administrateur',
  })
]

//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < admins.length; i++) {
  console.log('A : ' + done)
  admins[i].save((err, user) => {
    console.log('B : ' + done)
    if (err) console.log('ERROR ! : ' + err.message)
    else {
      console.log('C : ' + done)
      var newCalendar = new Calendar({ userId: user._id })
      newCalendar.save((err, calendar) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        done++
        console.log('D : ' + done)
      })
      console.log('E : ' + done)
      // done++      
      if (done === admins.length) {
        console.log("Admins seeding complete. Yeah (づ｡◕‿◕｡)づ !")
        exit()
      }
    }
  })
}
//Problemes asynchrone, là le seeder marche mais il ne se ferme pas (done++ fait que dalle).

function exit() {
  mongoose.disconnect()
}