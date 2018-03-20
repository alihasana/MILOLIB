import User from '../models/User.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.MONGOURL, {}, function (err) {
    if (err) { throw err; } else {
        console.log('Connection to the Database etablished (' + process.env.MONGOURL + ')...');
    }
})


let admins = [
    new User({
        email: 'admin',
        hash_password: bcrypt.hashSync('admin', 10),
        role: 'admin'  
    })
];


//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
let done = 0;
for (let i = 0; i < admins.length; i++) {
    admins[i].save(function (err, result) {
        done++
        if (done === admins.length) {
            console.log("Admins seeding complete. Yeah (づ｡◕‿◕｡)づ !");
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}