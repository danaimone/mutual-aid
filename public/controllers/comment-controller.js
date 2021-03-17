let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

module.exports.comment =function(req,res){
    let ticketID = req.body.ticketID;
    let reply = req.body.reply;
    let username = req.cookies.username;


    if(reply === "") {
        req.flash('error', "" );
        req.flash('errorMsg', "Not a valid comment");
        res.redirect('/tickets');
        return;
    }

    /* var to submit into specific ticket post */
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
}

