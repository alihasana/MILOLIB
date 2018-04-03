import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from '../../helpers/helper';
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

router.get('/', (req, res) => {
  helper.beforeSendUser(res.locals.user)
  res.status(200).json({ success: true, message: 'Your profile.', content: res.locals.user })
})

router.get('/products', (req, res) => {
  Product.find({ userId : res.locals.user._id },  (err, products) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      helper.beforeSend(products)
      res.status(200).json({ success: true, message: 'List of your products.', content: products })
    }
  })
})

// {runValidators : true}
// exploiter le contenue de "result" pour faire des réponses differentes
router.put('/', (req, res) => {
  res.locals.user.update(req.body, (err, result) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else res.status(200).json({ success: true, message: 'Profile updated!', content: result })
  })
})

// pour router.put : if (req.body.password || req.body.hashPassword) functionQuiGereLeBail()

export default router