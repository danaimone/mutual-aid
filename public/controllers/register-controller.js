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
      req.flash('error', "" );
      req.flash('errorMsg', "No Username and Password provided.");
      res.redirect('/');
      return;
    }

    var sql = `INSERT INTO Users (username, firstName, lastName, email, password)
    VALUES (@username, @fname, @lname, @email, @pass);`;
    var request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err);
            req.flash('error', "" );
            req.flash('errorMsg', "Error registering. Please try again.");
            res.redirect('/');
            return;
        } else {
            console.log(rowCount + " rows affected.");
            req.flash('error', "" );
            req.flash('errorMsg', "");
            res.redirect('/');
            return;
        }
    });
    request.addParameter('usernme', TYPES.VarChar, username);
    request.addParameter('fname', TYPES.VarChar, fname);
    request.addParameter('lname', TYPES.VarChar, lname);
    request.addParameter('email', TYPES.VarChar, email);
    request.addParameter('pass', TYPES.VarChar, pass);

    connection.execSql(request);
}
