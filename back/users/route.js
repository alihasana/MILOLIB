import express from 'express'
import mongoose from 'mongoose'
import User from './../models/User'
const ObjectId = mongoose.Types.ObjectId;

let users = express.Router();

users.use('/:id', (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    next()
  } else {
    res.status(404).send({ message: 'user not found' })
  }
});

users.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    else res.json(users);
  });
});

// users.get('/:id', (req, res) => {
//   if (req.quezac)
//   User.findById(req.params.id, function (err, result) {

//   })
// })

export default users;

// console.log("req.quezac ! : ", req.quezac)