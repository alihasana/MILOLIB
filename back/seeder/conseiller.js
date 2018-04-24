import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let conseillerSeed = () => {
	return new Promise(resolve => {
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
					resolve("Conseillers seeding complete. Yeah (づ｡◕‿◕｡)づ !")
				}
			})
		}
	})
}

export default conseillerSeed