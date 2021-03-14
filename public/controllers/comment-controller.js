let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;
module.exports.comment =function(req,res){
    let ticketUser = req.body.ticketUser;
    let reply = req.body.reply;

    /*Get current username*/

    console.log(ticketUser)

    if(reply === "") {
        req.flash('error', "" );
        req.flash('errorMsg', "Not a valid comment");
        res.redirect('/tickets');
        return;
    }

    /* var to submit into specific ticket post */
    var sql = `SELECT ticketTitle FROM ticket where username = @user (reply)
    VALUES (@user, @reply);`;

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
            res.redirect('/');
            return;
        }
    });

    request.addParameter('reply', TYPES.VarChar, reply);
    request.addParameter('user', TYPES.VarChar, ticketUser);

    //connection.execSql(request);
}
