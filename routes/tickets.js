/* Routing for Tickets page */
let connection = require('../public/controllers/database');
let Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

const getTickets = () => new Promise(
  (resolve, reject) => {
    var tickets = [];
    let sql = `SELECT * FROM Tickets;`
    let request = new Request(sql, (err, rowCount, rows) => {
      if (err) {
        reject(err);
      } else {
        for(let i=rows.length-1; i>=0; i--) {
          let ticket = {};
          let row = rows[i];
          for (let j=0; j<row.length; j++) {
            let element = row[j];
            let colName = element.metadata.colName;
            ticket[colName] = element.value;
          }
          tickets.push(ticket);
        }

        // Asynchronously return the tickets list
        resolve(tickets);
      }
    });

    connection.execSql(request);
  });

module.exports = function(app){
  app.get('/tickets', function(req, res){
    if ('username' in req.cookies) {
      // Async handle grabbing ticket data
      getTickets()
          .then(ok => {
            res.render('tickets', {
              title: 'Tickets - Mutual Aid',
              layout: 'tickets',
              tickets: ok, // `ok` is the name of the returned tickets list
              replies: [{replyID: 2, username: "hello5", text:"hello2.0"},{replyID: 8, username: "hello1", text:"hello2.0"}],
              boolOpen: false,
              idOpen: 0
            });
          })
          .catch(err => {
              console.log(err)
              });

    } else {
      res.render('ticket-error', {
        title: 'Tickets - No Access',
        layout: 'ticket-error'
      })
    }
  });
}

