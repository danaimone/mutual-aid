var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mutual Aid' , layout: false});
});

router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'Tickets', layout: 'faq'} );
});

/* GET Map page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Map - Mutual Aid', layout: false} );
});


module.exports = router;
