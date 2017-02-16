var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rainbow Super Attack Happy Fun Time' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'Rainbow Super Attack Happy Fun Time' });
});

module.exports = router;
