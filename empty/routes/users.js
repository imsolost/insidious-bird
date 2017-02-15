var express = require('express');
var router = express.Router();
var db = require('../database/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/signup', function(req, res, next) {
  let { user_name, password } = req.body

  db.insertUser({ user_name: user_name, password: password })
    .then( user => {
        console.log('hi im the user', user);
        res.redirect('/game')
    })
  //res.send('respond with a resource');
});

module.exports = router;
