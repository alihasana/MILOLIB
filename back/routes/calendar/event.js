import express from 'express'
import mongoose from 'mongoose'
// import User from './../users/model'

let router = express.Router()
/* as per my idea post method is not required, we can change into put method
and mention default value as 0 for duration and and other types will create
automatically while creating the user

//Why is not required?
because more than one setting is required for one type */
router.post('/', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        res.locals.user.calendar.eventsTypes.push(req.body[i])
    }

    res.locals.user.markModified('calendar.eventsTypes.type')
    res.locals.user.markModified('calendar.eventsTypes.duration')

    res.locals.user.save((err) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(200).json({ success: true, message: 'C\'est ok. Event ajoutées' })
    })
})

export default router