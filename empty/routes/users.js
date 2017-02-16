var express = require('express');
var router = express.Router();
var db = require('../database/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  let { user_name, password } = req.body

  db.insertUser({ user_name: user_name, password: password })
    .then( user => {
        res.redirect('/game')
    })
  //res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  let { user_name, password } = req.body

  db.retrieveUser({ user_name: user_name })
    .then( user => {
      console.log('USER: ', user[0], 'PASS: ', password);
      if ( user[0] ) {
        if ( user[0].password === password ) { res.redirect('/game')
        }
        else {
          res.send('wrong password you, but')
        }
      }
      else {
        res.send('nihilism')
      }
    })
  //res.send('respond with a resource');
});

module.exports = router;
