import express from "express";
import mongoose from "mongoose";
// bcrypt sert à hasher des chaines de caracteres
// on l'utilise ici pour hasher les password et les rendre secure
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// On importe ici les modeles (schemas) mongoose afin de les utiliser
import User from "./../../models/User";

let auth = express.Router();

// La route pour se logger et recevoir un token
auth.post("/login", (req, res) => {
  console.log("ICI", req.body);
  // On verifie que l'utilisateur a envoyé l'email et le password dans le req.body
  if (req.body && req.body.email && req.body.password) {
    // On appelle le model USER defini dans mongoose et importé plus haut
    // avec la methode findOne qui cherche un objet avec la propriété 'email' correspondant à notre requete
    // cette methode renvoi le premier utilisateur trouvé ou rien
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) res.status(500).json({ success: false, message: err.message });
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.."
        });
      } else if (user) {
        // Si l'utilisateur existe, on compare les password avec la méthode comparePasswords (défini dans le modele utilisateur User)
        if (!user.comparePasswords(req.body.password)) {
          res.status(401).json({
            success: false,
            message: "Authentication failed. Wrong password.."
          });
        } else {
          // Avec JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...}) on créer un token
          // JWT utilise ce qu'on met dans le payload plus la secretkey pour creer ce token
          // puis il renvoi ce token dans le 'result' du callback
          // On recupere donc ce token et on l'envoi dans une reponse.
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
