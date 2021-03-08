/* Routing for Tickets page */
let router = require('./index')
let ticketsController=require("../public/controllers/tickets-controller");

module.exports = function(app){
  app.get('/tickets', function(req, res){
    res.render('tickets', {
      title: 'Tickets - Mutual Aid',
      layout: 'tickets'
    });
  });

  router.post('/tickets-controller.js', ticketsController.createTicket);
}

