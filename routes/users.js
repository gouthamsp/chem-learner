var express = require('express');
var router = express.Router();
const sha256 = require('sha256');
const userModel = require('../models/users');
const common = require('./common');
const mongoose = require('mongoose');


/* Change User preferences -- endpoint --> /users/userPreferences/ */
router.post('/userPreferences/', (req, res) => {
  const auth_token = req.headers['authorization'] || '';
  const decodedToken = common.decodeUserToken(auth_token);
  if (decodedToken) {
    userModel.UserModel.findById(decodedToken._id, (err, usr) => {
      if (err || !usr) {
        res.send(common.generateResponse(8));
      } else {
        try {
          if (req.body.favoriteTheme) {
            usr.interests.favoriteTheme = req.body.favoriteTheme;
          }
          if (req.body.organicOrInorganic) {
            usr.interests.organicOrInorganic = req.body.organicOrInorganic;
          }
          usr.save();
          res.send(common.generateResponse(0));
        } catch (err) {
          console.log("Error in user preferences: ", err);
          res.send(common.generateResponse(5));
        }
      }
    });
  } else {
    res.send(common.generateResponse(8));
  }
});


/* User onboarding and interests within Chemisty --endpoint --> /users/userInterests/ */
router.post('/userInterests/', (req, res) => {
  const auth_token = req.headers['authorization'] || '';
  const decodedToken = common.decodeUserToken(auth_token);
  if (decodedToken) {
    userModel.UserModel.findById(decodedToken._id, (err, usr) => {
      if (err || !usr) {
        res.send(common.generateResponse(8));
      } else {
        try {
          if (usr.isOnboarded) {
            res.send(common.generateResponse(9));
          } else {
            var userInterests = {
              organicOrInorganic: req.body.organicOrInorganic,
              favoriteTheme: req.body.favoriteTheme
            };
            usr.interests = userInterests;
            usr.isOnboarded = true;
            usr.save();
            res.send(common.generateResponse(0));
          }
        } catch (err) {
          console.log('Error here: ', err);
          res.send(common.generateResponse(5));
        }
      }
    });
  } else {
    res.send(common.generateResponse(7));
  }
});


/* Create a new User -- endpoint --> /users/userSignUp/ POST */

router.post('/userSignUp/', (req, res) => {
  userModel.UserModel.findOne({email: req.body.email}, (err, foundUser) => {
    console.log(foundUser);
    if (!err && foundUser) {
      res.send(common.generateResponse(6));
    } else {
        const newUserObject = new userModel.UserModel({
          email: req.body.email,
          password: sha256(req.body.password),
          phone: req.body.phone,
          name: req.body.name,
          isStudent: req.body.isStudent,
          changePassword: false
        });
        newUserObject.save();
        res.send(common.generateResponse(0));
    }
  });
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


/* To submit a password change -- endpoint --> /users/newPassword/ POST */
router.post('/newPassword/', (req, res) => {
  // TODO: Write logic for changing password

  const tempToken = req.headers['authorization'];
  const decodedTempToken = common.decodeUserToken(tempToken);
  console.log('New password is:', req.body.password);
  if (!decodedTempToken) {
    res.send(common.generateResponse(7));
    return;
  }
  userModel.UserModel.findOneAndUpdate({ _id: decodedTempToken._id }, { $set: { changePassword: false, password: sha256(req.body.password) }}, (err, usr) => {
    if (err || !usr) {
      res.send(common.generateResponse(5));
    } else {
      console.log(usr);
      res.send(common.generateResponse(0));
    }
  });
});


/* To request for a password change -- endpoint --> /users/changePassword/ GET */
router.get('/changePassword/', (req, res) => {

  const emailAddress = req.query.email;
  var passwordChange = false;
  userModel.UserModel.findOne({ email: emailAddress, changePassword: true }, (err, usr) => {
    if (err || !usr) {
      passwordChange = false;
    } else if (usr.changePassword) {
      passwordChange = true;
    }
  });

  userModel.UserModel.findOneAndUpdate({ email: emailAddress }, { $set: { changePassword: true }}, (err, usr) => {
    if (err || !usr) {
      res.send(common.generateResponse(3));
    } else {
      if (!passwordChange) {
        common.generateUserToken(usr._id, res);
      } else {
        res.send(common.generateResponse(10));
      }
    }
  });
});


module.exports = router;
