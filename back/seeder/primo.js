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


let primos = [
    new User({
        email: 'primo',
        hashPassword: bcrypt.hashSync('primo', 10),
        role: 'primo'  
    })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < primos.length; i++) {
    primos[i].save( (err, result) => {
        done++
        if (done === primos.length) {
            console.log("Primos seeding complete. Yeah \(  ͯ ε   ͯ)/ !")
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}