import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import dotEnv from 'dotenv'
dotEnv.config()

import adminConseillerSeed from './admin-conseiller'
import adminSeed from './admin'
import accueilSeed from './charge-accueil'
import conseillerSeed from './conseiller'
import followerSeed from './follower'
import inviteSeed from './invite'
import primoSeed from './primo'
import suivitSeed from './suivit'

let workToDo = [
  adminConseillerSeed,
  adminSeed,
  accueilSeed,
  conseillerSeed,
  followerSeed,
  inviteSeed,
  primoSeed,
  suivitSeed
]

async function seeder(array) {
  for (let item of array) {
    let result = await item.call()
    console.log(result)
  }
  console.log('---------------------------')
  console.log('ᕕ( ᐛ )ᕗ ### Seeding complete ᕙ(⇀‸↼‶)ᕗ')
  mongoose.disconnect()
}

mongoose.connect(process.env.DB, {}, (err) => {
  if (err) { throw err; } else {
      console.log('Connection to the Database etablished (' + process.env.DB + ')...')
      console.log('---------------------------')
      seeder(workToDo)
  }
})