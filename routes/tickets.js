/* Routing for Tickets page */

module.exports = function(app){
  /* Get web page */
  app.get('/tickets', function(req, res){
    res.render('tickets', {
      title: 'Tickets - Mutual Aid',
      layout: 'tickets'
    });
  });


}



