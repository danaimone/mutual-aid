/* Routing for Tickets page */

module.exports = function(app){
  app.get('/map', function(req, res){
    res.render('map', {
      title: 'Map - Mutual Aid',
      layout: 'map'
    });
  });
}




