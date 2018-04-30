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


let conseillers = [
    new User({
        email: 'conseiller',
        password: bcrypt.hashSync('conseiller', 10),
        role: 'Conseiller',
    })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < conseillers.length; i++) {
    conseillers[i].save( (err, result) => {
        done++
        if (done === conseillers.length) {
            console.log("Conseillers seeding complete. Yeah (づ｡◕‿◕｡)づ !")
            exit()
        }
    })
}

function exit() {
	mongoose.disconnect()
}