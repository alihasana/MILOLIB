import User from './../routes/users/model'
import Client from './../routes/clients/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let primoSeed = () => {
	return new Promise(resolve => {
		let primos = [
			new Client({
				email: 'primo',
				password: bcrypt.hashSync('primo', 10),
				role: 'Primo',
			})
		]

		//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
		let done = 0
		for (let i = 0; i < primos.length; i++) {
			primos[i].save( (err, result) => {
				done++
				if (done === primos.length) {
					resolve("Primos seeding complete. Yeah \(  ͯ ε   ͯ)/ !")
				}
			})
		}
	})
}

export default primoSeed