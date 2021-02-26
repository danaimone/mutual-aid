/* Routing for Tickets page */

module.exports = function(app){
  app.get('/tickets', function(req, res){
    res.render('tickets', {
      title: 'Tickets - Mutual Aid',
      layout: 'tickets'
    });
  });
}




