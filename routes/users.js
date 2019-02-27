var express = require('express');
var router = express.Router();
const sha256 = require('sha256');
const userModel = require('../models/users');
const common = require('./common');

/* GET users listing. */
router.post('/', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (email === 'abc@abc.com' && password === '12345') {
    res.send('Logged In!');
  } else {
    res.send('Failed to Login!');
  }
});

router.get('/', (req, res) => {
  res.send('This URL Does not support get requests!')
});


/* Create a new User -- endpoint --> /users/createUser/ POST */

router.post('/createUser/', (req, res) => {
  console.log('Request Body:', req.body)
  const newUserObject = new userModel.UserModel({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: sha256(req.body.password),
    phone: req.body.phone,
    bloodGroup: req.body.bloodGroup
  });
  newUserObject.save();
  console.log(newUserObject);
  res.send(common.generateResponse(0, { userId: newUserObject._id }));
});


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


router.post('/signOut', (req, res) => {
  const token = req.headers.authorization;
  const decodedInfo = common.decodeUserToken(token);
  const userId = decodedInfo._id;

  userModel.UserModel.findById(userId, (err, usr) => {
    if (err || !usr) {
      console.log('Error finding user or User doesnot exist --> ', err);
      res.send(common.generateResponse(3));
    } else {
      // TODO: Record user Sign out here
      res.send(common.generateResponse(0));
    }
  });
});

module.exports = router;
