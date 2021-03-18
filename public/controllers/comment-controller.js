let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

/* comment()
* This will insert a reply, in the future this could be changed to
* dynamically adding the tickets by finding a way to pass in the
* new replies variable. At the moment, it is redirected to the
* tickets page.
* */

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

