let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;


module.exports.register=function(req,res){
    let username = req.body.user;
    let pass = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    if(username == "" || pass == "") {
      res.json({
        message:"You must input a username and password."
        })
    }

    var sql = `INSERT INTO Users (username, firstName, lastName, email, password)
    VALUES (@username, @fname, @lname, @email, @pass);`;
    var request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err);
            res.json({
                message: "Error registering user. Please try again"
            });
        } else {
            console.log(rowCount + " rows affected.");
            res.cookie('username', username);
            res.redirect(req.headers['origin']);
        }
    });
    request.addParameter('username', TYPES.VarChar, username);
    request.addParameter('fname', TYPES.VarChar, fname);
    request.addParameter('lname', TYPES.VarChar, lname);
    request.addParameter('email', TYPES.VarChar, email);
    request.addParameter('pass', TYPES.VarChar, pass);

    connection.execSql(request);
}
