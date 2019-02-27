var express = require('express');
var router = express.Router();
const sha256 = require('sha256');
const userModel = require('../models/users');
const common = require('./common');


/* Create a new User -- endpoint --> /users/userSignUp/ POST */

router.post('/userSignUp/', (req, res) => {
  console.log('Request Body:', req.body)
  const newUserObject = new userModel.UserModel({
    name: req.body.name,
    email: req.body.email,
    password: sha256(req.body.password),
    phone: req.body.phone,
  });
  newUserObject.save();
  console.log(newUserObject);
  res.send(common.generateResponse(0));
});


/* Sign a user in with a jwt -- endpoint --> /users/signIn/ POST */
router.post('/signIn', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel.UserModel.findOne({ email: email }, (err, usr) => {
    if (err || !usr) {
      console.log('Error finding user or user does not exisit --> ', err);
      res.send(common.generateResponse(3));
    } else {
      const encodedUserPassword = usr.password;
      if (sha256(password) === encodedUserPassword) {
        console.log('Passwords matches');
        console.log('User email: ', usr.email);
        common.generateUserToken(usr._id, res);
      } else {
        res.send(common.generateResponse(2));
      }
    }
  });
});


module.exports = router;
