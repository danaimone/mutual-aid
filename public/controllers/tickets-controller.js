let connection = require('./database');
let Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


module.exports.createTicket=function(req,res){
    console.log(req.body);
    let user = req.body.user;
    let pass = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    if(user == "" || pass == "") {
      res.json({
        message:"You must input a username and password."
        })
    }

    var sql = `INSERT INTO Users (username, firstName, lastName, email, password)
    VALUES (@user, @fname, @lname, @email, @pass);`;
    var request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err);
            res.json({
                message: "Error registering user. Please try again"
            });
        } else {
            console.log(rowCount + " rows affected.");
            res.redirect(req.headers['origin']);
        }
    });
    request.addParameter('user', TYPES.VarChar, user);
    request.addParameter('fname', TYPES.VarChar, fname);
    request.addParameter('lname', TYPES.VarChar, lname);
    request.addParameter('email', TYPES.VarChar, email);
    request.addParameter('pass', TYPES.VarChar, pass);

    //connection.execSql(request);
}
