import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../../models/User";

let auth = express.Router();


auth.post("/login", (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) res.status(500).json({ success: false, message: err.message });
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.."
        });
      } else if (user) {
        if (!user.comparePasswords(req.body.password)) {
          res.status(401).json({
            success: false,
            message: "Authentication failed. Wrong password.."
          });
        } else {
          // Avec JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...}) on créer un token
          jwt.sign(
            { email: user.email, _id: user._id, role: user.role },
            process.env.SECRETKEY,
            function(err, token) {
              if (err)
                res.status(500).json({ success: false, message: err.message });
              else
                res.status(200).json({
                  success: true,
                  message: "Enjoy your unlimited access!",
                  content: {
                    token: process.env.AUTHBEARER + " " + token,
                    userId: user._id
                  }
                });
            }
          );
        }
      }
    });
  } else {
    res
      .status(412)
      .json({ success: false, message: "Email and/or password are mising.." });
  }
});

export default auth;
