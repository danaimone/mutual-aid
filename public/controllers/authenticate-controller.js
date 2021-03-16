let connection = require('./database');
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;


module.exports.authenticate=function(req,res){
    let username=req.body.user;
    let password=req.body.password;

    var errorString = "";
    if(username == "" || password == "") {
      req.flash('error', "No Username and Password provided." );
      req.flash('errorMsg', "");
      res.redirect('/');
        return;
    }

    let sql = 'SELECT password FROM Users WHERE username = @user;'
    var request = new Request(sql, (err, rowCount) => {
        if (err) {
          req.flash('error', "Username does not exist." );
          req.flash('errorMsg', "");
          res.redirect('/');
          return;
        } else {
            if (rowCount < 1) {
              req.flash('error', "Username does not exist." );
              req.flash('errorMsg', "");
              res.redirect('/');
            }
        }
    });

    request.addParameter('user', TYPES.VarChar, username);
    request.on('row', function(columns) {
        console.log(columns);
        if (columns.length < 1) {
          req.flash('error', "Username does not exist." );
          req.flash('errorMsg', "");
          res.redirect('/');
        }
        else {
            if (password === columns[0].value) {
              res.cookie('username', username);
              req.flash('error', "" );
              req.flash('errorMsg', "");
              res.redirect('/');
                return;
            } else {
              req.flash('error', "Password is incorrect." );
              req.flash('errorMsg', "");
              res.redirect('/');
                return;
            }
        }
    });

    connection.execSql(request);
}
