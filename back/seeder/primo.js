import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let primoSeed = new Promise((resolve, reject) => {
	let primos = [
		new User({
			email: 'primo',
			password: bcrypt.hashSync('primo', 10),
			role: 'Primo',
			calendar: {}  
		})
	]

	//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
	let done = 0
	for (let i = 0; i < primos.length; i++) {
		primos[i].save( (err, result) => {
			done++
			if (done === primos.length) {
				console.log("Primos seeding complete. Yeah \(  ͯ ε   ͯ)/ !")
				resolve()
			}
		})
	}
})

export default primoSeed