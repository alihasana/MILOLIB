import User from './../routes/users/model'
import Calendar from './../routes/calendar/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const ObjectId = mongoose.Types.ObjectId

import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.DB, {}, (err) => {
  if (err) { throw err; } else {
    console.log('Connection to the Database etablished (' + process.env.DB + ')...')
  }
})


let staffNoCalendar = [
  new User({
    email: 'admin',
    password: bcrypt.hashSync('admin', 10),
    role: 'Administrateur',
  }),
  new User({
    email: 'accueil',
    password: bcrypt.hashSync('accueil', 10),
    role: 'Chargé d\'accueil',
  }),
  new User({
    email: 'invité',
    password: bcrypt.hashSync('invité', 10),
    role: 'Invité',
  })
]

let staff = [
  new User({
    email: 'conseiller',
    password: bcrypt.hashSync('conseiller', 10),
    role: 'Conseiller',
    calendar: new ObjectId(),
  }),
  new User({
    email: 'admin-conseiller',
    password: bcrypt.hashSync('admin-conseiller', 10),
    role: 'Administrateur/Conseiller',
    calendar: new ObjectId(),
  }),
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < staffNoCalendar.length; i++) {
  staffNoCalendar[i].save((err, user) => {
    if (err) console.log('ERROR In user.save() ! : ' + err.message)
  })
}

for (let i = 0; i < staff.length; i++) {
  staff[i].save((err, user) => {
    if (err) return console.log('ERROR In user.save() ! : ' + err.message)
    var newCalendar = new Calendar({ userId: user._id, _id: user.calendar })
    newCalendar.save((err, calendar) => {
      if (err) return console.log('ERROR In calendar.save() ! : ' + err.message)
      done++
      if (done === staff.length) {
        setTimeout(() => { // setTimeout because of index creation. Temporary fix.
          console.log("Staff seeding complete. Yeah (づ｡◕‿◕｡)づ !")
          exit()
        }, 3000)
      }
    })
    // done++
    // if (done === staff.length) {
    //   console.log("Staff seeding complete. Yeah (づ｡◕‿◕｡)づ !")
    //   exit()
    // }  
  })
}

function exit() {
  mongoose.disconnect()
}