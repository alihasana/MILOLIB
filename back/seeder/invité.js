import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.DB, {}, (err) => {
    if (err) { throw err; } else {
        console.log('Connection to the Database etablished (' + process.env.DB + ')...')
    }
})


let invités = [
    new User({
        email: 'invité',
        password: bcrypt.hashSync('invité', 10),
        role: 'Invité',
        calendar: {} 
    })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < invités.length; i++) {
    invités[i].save( (err, result) => {
        done++
        if (done === invités.length) {
            console.log("Invités seeding complete. Yeah (づ｡◕‿◕｡)づ !")
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}