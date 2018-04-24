import User from './../routes/users/model'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let followerSeed = () => {
	return new Promise(resolve => {
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
					resolve("Followers seeding complete. Yeah (╭☞⫑益⫒)╭☞ !")
				}
			})
		}
	})
}

export default followerSeed