var express = require('express');
var router = express.Router();
var authenticateController=require("../public/controllers/authenticate-controller");
var registerController=require("../public/controllers/register-controller");
var ticketsController=require("../public/controllers/tickets-controller");
var contactsController=require("../public/controllers/send-email");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mutual Aid' , layout: false, error: req.flash('error'), errorMsg: req.flash('errorMsg'), contact: req.flash('contacts') });
});

router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'Tickets', layout: 'faq'} );
});

/* GET Map page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Map - Mutual Aid', layout: false} );
});

router.get('/registration', function (req, res) {
   res.sendFile( __dirname + "/" + "registration.html" );
});

router.get('/login', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
});

/* route to handle login and registration */
/*
router.post('/api/register',registerController.register);
router.post('/api/authenticate',authenticateController.authenticate);
router.post('/api/createTicket',ticketsController.createTicket);

 */

router.post('/register-controller.js', registerController.register);
router.post('/authenticate-controller.js', authenticateController.authenticate);
router.post('/send-email', contactsController.sendmail);

module.exports = router;
