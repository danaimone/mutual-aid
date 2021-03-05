var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register=function(req,res){
  var user = req.body.email;
  var pass = req.body.password;
  if(user == "" || pass == "") {
    res.json({
      message:"You must input a username and password."
      })
  }
  var values = [
    [user, pass]
  ];
    var sql = "INSERT INTO users (username, password) VALUES ?";
    connection.query(sql, [values], function (error, results, fields) {
      if (error) {
        res.json({
            message: "Error registering user. Please try again"
        })
      }else{
       res.redirect('http://localhost:3000');
      }
    });
}
