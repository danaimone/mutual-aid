let connection = require('./database');
let Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


module.exports.createTicket=function(req,res){
    let user = req.cookies.username;
    let type = req.body.type;
    let title = req.body.title;
    let desc = req.body.description;

    var sql = `INSERT INTO Tickets (username, type, title, description)
    VALUES (@user, @type, @title, @desc);`;
    var request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.log("oop we caught an error:");
            console.error(err);
            res.json({
                message: "Error creating ticket. Please try again"
            });
        } else {
            console.log(rowCount + " rows affected.");
            res.redirect('/tickets');
        }
    });
    request.addParameter('user', TYPES.VarChar, user);
    request.addParameter('type', TYPES.VarChar, type);
    request.addParameter('title', TYPES.VarChar, title);
    request.addParameter('desc', TYPES.VarChar, desc);

    connection.execSql(request);
}
