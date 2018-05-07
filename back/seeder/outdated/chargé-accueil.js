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


let accueils = [
    new User({
        email: 'accueil',
        password: bcrypt.hashSync('accueil', 10),
        role: 'Chargé d\'accueil',
    })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < accueils.length; i++) {
    accueils[i].save( (err, result) => {
        done++
        if (done === accueils.length) {
            console.log("chargés d'accueil seeding complete. Yeah (づ｡◕‿◕｡)づ !")
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}