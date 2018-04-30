import User from './../routes/users/model'
import Client from './../routes/clients/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let suivitSeed = () => {
	return new Promise(resolve => {
		let suivits = [
			new Client({
				email: 'suivit',
				password: bcrypt.hashSync('suivit', 10),
				role: 'Suivit',
				calendar: {} 
			})
		]

		//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
		let done = 0
		for (let i = 0; i < suivits.length; i++) {
			suivits[i].save( (err, result) => {
					done++
					if (done === suivits.length) {
						resolve("Suivits seeding complete. Yeah (╭☞⫑益⫒)╭☞ !")
					}
			})
		}
	})
}

export default suivitSeed