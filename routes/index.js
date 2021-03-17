var express = require('express');
var router = express.Router();
var authenticateController = require("../public/controllers/authenticate-controller");
var registerController = require("../public/controllers/register-controller");
var commentController = require("../public/controllers/comment-controller");
var contactsController = require("../public/controllers/send-email");
let ticketsController = require("../public/controllers/tickets-controller");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Mutual Aid',
        layout: false,
        error: req.flash('error'),
        errorMsg: req.flash('errorMsg'),
        contact: req.flash('contacts'),
        username: req.cookies.username
    });
});

router.get('/faq', function (req, res, next) {
    res.render('faq', {title: 'Tickets', layout: 'faq', username: req.cookies.username});
});

/* GET Map page. */
router.get('/map', function (req, res, next) {
    res.render('map', {title: 'Map - Mutual Aid', layout: false, username: req.cookies.username});
});

router.get('/registration', function (req, res) {
    res.sendFile(__dirname + "/" + "registration.html");
});

router.get('/login', function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
});


router.post('/tickets-controller.js', ticketsController.createTicket);
router.post('/register-controller.js', registerController.register);
router.post('/authenticate-controller.js', authenticateController.authenticate);
router.post('/comment-controller.js', commentController.comment);
router.post('/send-email', contactsController.sendmail);

module.exports = router;
