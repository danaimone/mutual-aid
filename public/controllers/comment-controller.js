let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

/* This method has the same reasoning behind it as
*  ticketModal.js has please refer to it to understand
*  why these functions are called here
* */

module.exports.comment =function(req,res){
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

    let ticketID = req.body.ticketID;
    let reply = req.body.reply;
    let username = req.cookies.username;

    if(reply === "") {
        req.flash('error', "" );
        req.flash('errorMsg', "Not a valid comment");
        res.redirect('/tickets');
        return;
    }

    /* Creating an entry in replies to reflect changes */
    var sql = `INSERT INTO Replies (ticketID, username, text)
    VALUES (@ticketID, @user, @reply);`;
    var request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err);
            req.flash('error', "" );
            req.flash('errorMsg', "Error Replying. Please try again.");
            res.redirect('/tickets');
            return;
        } else {
            console.log(rowCount + " rows affected.");
            req.flash('error', "" );
            req.flash('errorMsg', "");

            // TODO: figure out where to redirect
            res.redirect('/tickets');
            return;
        }
    });
    request.addParameter('ticketID', TYPES.Int, ticketID);
    request.addParameter('reply', TYPES.VarChar, reply);
    request.addParameter('user', TYPES.VarChar, username);

    connection.execSql(request);

    /* Wait for previous request to finish, then:
    * Render tickets page without routing there, to include updated ticket replies
    * */
    request.on('requestCompleted', function () {
        res.redirect("/tickets");
    })

    return;
}

