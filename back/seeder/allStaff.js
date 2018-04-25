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


let staff = [
  new User({
    email: 'admin',
    password: bcrypt.hashSync('admin', 10),
    role: 'Administrateur',
  }),
  new User({
    email: 'conseiller',
    password: bcrypt.hashSync('conseiller', 10),
    role: 'Conseiller',
  }),
  new User({
    email: 'accueil',
    password: bcrypt.hashSync('accueil', 10),
    role: 'Chargé d\'accueil',
  }),
  new User({
    email: 'admin-conseiller',
    password: bcrypt.hashSync('admin-conseiller', 10),
    role: 'Administrateur/Conseiller',
  })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < staff.length; i++) {
  console.log('A : ' + done)
  staff[i].save((err, user) => {
    // console.log('B : ' + done)
    if (err) console.log('ERROR In user.save() ! : ' + err.message)
    else {
      // console.log('C : ' + done)
      var newCalendar = new Calendar({ userId: user._id })
      newCalendar.save((err, calendar) => {
        if (err) console.log('ERROR In calendar.save() ! : ' + err.message)
        done++
        console.log('D : ' + done)
        if (done === staff.length) {
          console.log("Staff seeding complete. Yeah (づ｡◕‿◕｡)づ !")
          exit()
        }
      })
      console.log('E : ' + done)
      // done++      
    }
  })
}
//Problemes asynchrone, là le seeder marche mais il ne se ferme pas (done++ fait que dalle).

function exit() {
  mongoose.disconnect()
}