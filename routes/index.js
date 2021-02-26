var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mutual Aid' });
});

router.get('/tickets', function(req, res, next) {
  res.render('tickets', { title: 'Tickets', layout: 'tickets'} );
});

router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'Tickets', layout: 'faq'} );
});


module.exports = router;
