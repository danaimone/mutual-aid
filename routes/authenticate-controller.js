var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');
module.exports.authenticate=function(req,res){
    var username=req.body.email;
    var password=req.body.password;

    if(username == "" || password == "") {
      res.json({
        message:"You must input a username and password."
        })
    }

    connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            message:"Error logging in. Please try again."
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.redirect('http://localhost:3000');
            }else{
                res.json({
                  message:"Username and Passsword do not match."
                 });
            }

        }
        else{
          res.json({
            message: "Account with this username does not exist. Please register as new user"
          });
        }
      }
    });
}