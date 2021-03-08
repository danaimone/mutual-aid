let connection = require('./database');
let Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


module.exports.authenticate=function(req,res){
    let username=req.body.user;
    let password=req.body.password;
    console.log(req);

    if(username == "" || password == "") {
      res.json({
        message:"You must input a username and password."
        })
    }

    let sql = 'SELECT password FROM Users WHERE username = @user;'
    var request = new Request(sql, (err) => {
        if (err) {
            console.error(err);
            res.json({
                message: "Username " + username + " not found."
            });
        }
    });

    request.addParameter('user', TYPES.VarChar, username);
    request.on('row', function(columns) {
        if (columns.length < 1) {
            res.json({
                message: "Username " + username + " not found."
            });
        }
        else {
            if (password === columns[0].value) {
                res.redirect(req.headers['origin']);
            } else {
                res.json({
                    message: "Password incorrect"
                });
            }
        }
    });

    connection.execSql(request);
}
