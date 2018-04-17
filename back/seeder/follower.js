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


let followers = [
    new User({
        email: 'follower',
        password: bcrypt.hashSync('follower', 10),
        role: 'follower'  
    })
]


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0
for (let i = 0; i < followers.length; i++) {
    followers[i].save( (err, result) => {
        done++
        if (done === followers.length) {
            console.log("Followers seeding complete. Yeah (╭☞⫑益⫒)╭☞ !")
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}