/* Routing for Tickets page */
let router = require('./index')
let ticketsController=require("../public/controllers/tickets-controller");
//const cookieParser = require('cookie-parser');

module.exports = function(app){
  //app.use(cookieParser)
  app.get('/tickets', function(req, res){
    res.render('tickets', {
      title: 'Tickets - Mutual Aid',
      layout: 'tickets'
    });
  });

  app.post('/tickets/comment', function(req, res){
    /* Send the information to server */
    const reply = req.body.reply;
    console.log(req.cookies)

    console.log(reply);


    res.render('tickets', {
      title: 'Tickets - Mutual Aid',
      layout: 'tickets'
    });
  });

  router.post('/tickets-controller.js', ticketsController.createTicket);
}

