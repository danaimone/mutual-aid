let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

/* A bit rough at the moment but hear me out
* Note 1: Main objective of this class is to retrieve replies
* Note 2: instead of being re-routed, I render the ticket page under the post URL
*         this helps with being able to pass in the replies list, as req.flash
*         can only send text apparently
* Note 3: Because it is being re-rendered I include the ticket getting function
*         getTickets() which can originally be found in tickets.js in the original
*         method for routing
* */

module.exports.getReply = function(req, res){
    /* Get all the tickets */
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

    /* Retrieve replies based on the ticket number */
    let ticketID = parseInt(req.body.ticketID, 10);
    var replies = [];
    let sql = `SELECT * FROM Replies WHERE ticketID = @num;
    `
    let request = new Request(sql, (err, rowCount, rows) => {
        if (err) {
            console.log("You encountered an error");
            console.log(err);

        } else {
            for(let i=rows.length-1; i>=0; i--) {
                let reply = {};
                let row = rows[i];
                for (let j=0; j<row.length; j++) {
                    let element = row[j];

                    // Rename username column
                    let colName = '';
                    if(!element.metadata.colName.localeCompare("username")) {
                        colName = "usernameReply";
                    } else {
                        colName = element.metadata.colName;
                    }

                    reply[colName] = element.value;
                }
                replies.push(reply);
            }
            replies = replies.reverse();
        }
    });

    request.addParameter('num', TYPES.Int, ticketID);
    connection.execSql(request);

    /* Wait for previous request to finish, then:
    * Render tickets page without routing there, to include updated ticket replies
    * */
    request.on('requestCompleted', function () {
        getTickets()
            .then(ok => {
                res.render('tickets', {
                    title: 'Tickets - Mutual Aid',
                    layout: 'tickets',
                    tickets: ok, // `ok` is the name of the returned tickets list
                    replies: replies,
                    boolOpen: true,
                    idOpen: ticketID
                });

            })
            .catch(err => {
                console.log(err)
            });
    })
    return;
};
