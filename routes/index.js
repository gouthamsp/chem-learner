var express = require('express');
var router = express.Router();
var common = require('./common');
var userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/userStats/', (req, res) => {
  const user_token = req.body.token;
});


router.post('/logStats', (req, res) => {
  const authToken = req.headers.authorization;
  const decodedToken = common.decodeUserToken(authToken);
  const userId = decodedToken._id;

  userModel.UserModel.findById(userId, (err, usr) => {
    // Check User exists and log data under that user
    res.send(common.generateResponse(0));
  });
});

module.exports = router;