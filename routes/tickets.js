var express = require('express');
var router = express.Router();

router.get('/tickets', function(req, res, next) {
  res.render('tickets', { title: 'Tickets', layout: false} );
});

module.exports = router;
