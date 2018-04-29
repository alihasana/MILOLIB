import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let accueilSeed = () => {
	return new Promise(resolve => {
		let accueils = [
			new User({
				email: 'accueil',
				password: bcrypt.hashSync('accueil', 10),
				role: 'Chargé d\'accueil',
				calendar: {}
			})
		]

		//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
		let done = 0
		for (let i = 0; i < accueils.length; i++) {
			accueils[i].save( (err, result) => {
				done++
				if (done === accueils.length) {
					resolve("Chargés d'accueil seeding complete. Yeah (づ｡◕‿◕｡)づ !")
				}
			})
		}
	})
}

export default accueilSeed