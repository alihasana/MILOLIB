import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let conseillerSeed = new Promise((resolve, reject) => {
	let conseillers = [
		new User({
			email: 'conseiller',
			password: bcrypt.hashSync('conseiller', 10),
			role: 'Conseiller',
			calendar: {} 
		})
	]

	//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
	let done = 0
	for (let i = 0; i < conseillers.length; i++) {
		conseillers[i].save( (err, result) => {
			done++
			if (done === conseillers.length) {
				console.log("Conseillers seeding complete. Yeah (づ｡◕‿◕｡)づ !")
				resolve()
			}
		})
	}
})

export default conseillerSeed