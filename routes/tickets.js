/* Routing for Tickets page */
let router = require('./index')
let ticketsController=require("../public/controllers/tickets-controller");

module.exports = function(app){
  app.get('/tickets', function(req, res){
    if ('username' in req.cookies) {
      console.log('username found: ' + req.cookies.username);
      res.render('tickets', {
        title: 'Tickets - Mutual Aid',
        layout: 'tickets'
      });
    } else {
      console.log('no username found');
      res.render('ticket-error', {
        title: 'Tickets - No Access',
        layout: 'tickets'
      })
    }
  });

  router.post('/tickets-controller.js', ticketsController.createTicket);
}

