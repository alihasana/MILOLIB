import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let inviteSeed = new Promise((resolve, reject) => {
	let invites = [
		new User({
			email: 'invité',
			password: bcrypt.hashSync('invité', 10),
			role: 'Invité',
			calendar: {} 
		})
	]

	//First Method (same as in the vidéo https://www.youtube.com/watch?v=V30Rpqi6kYE)
	let done = 0
	for (let i = 0; i < invites.length; i++) {
		invites[i].save( (err, result) => {
			done++
			if (done === invites.length) {
				console.log("Invités seeding complete. Yeah (づ｡◕‿◕｡)づ !")
				resolve()
			}
		})
	}
})

export default inviteSeed