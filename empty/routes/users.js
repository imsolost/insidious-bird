const express = require( 'express' );
const router = express.Router();
const db = require( '../database/db.js' )

router.get( '/', function ( req, res, next ) {
  res.render( 'signup' );
});

router.post('/signup', function ( req, res, next ) {
  let { user_name, password } = req.body

  db.insertUser({ user_name: user_name, password: password })
    .then( user => res.redirect( '/game' ) )
});

router.post('/login', function ( req, res, next ) {
  let { user_name, password } = req.body

  db.retrieveUser( { user_name: user_name } )
    .then( user => {
      if ( user[0] ) {
        if ( user[0].password === password ) {
          res.redirect('/game')
        }
        else {
          res.send('wrong password you, but')
        }
      }
      else {
        res.send('nihilism')
      }
    })
});

module.exports = router;
