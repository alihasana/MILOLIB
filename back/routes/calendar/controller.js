import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import helper from './../../helpers/helper';

export default {
  checkSlotsConflict: (arr2, val) => {
  return arr2.some(function (arr2Element) {
    return val === arr2Element.start
  })
} ,
}