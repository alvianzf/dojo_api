var express = require('express');
var router = express.Router();
var Users = require('mongoose').model('Users');

router.use('/api', require('./api'));

Users.userSeed()

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(200).json({message: 'page not found'})
});

module.exports = router;
