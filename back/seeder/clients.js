
import Client from './../routes/clients/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.DB, {}, (err) => {
  if (err) { throw err; } else {
    console.log('Connection to the Database etablished (' + process.env.DB + ')...')
  }
})


let client = [
  new Client({
    email: 'client',
    password: bcrypt.hashSync('client', 10),
    role: 'client',
  })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < client.length; i++) {
  client[i].save((err, user) => {
    if (err) console.log('ERROR In user.save() ! : ' + err.message)
    else {
      done++
      if (done === client.length) {
        setTimeout(() => { // setTimeout because of index creation. Shitty fix I know :)
          console.log("Client seeding complete. Yeah (づ｡◕‿◕｡)づ !")
          exit()
        }, 3000)
      }
    }
  })
}

function exit() {
  mongoose.disconnect()
}