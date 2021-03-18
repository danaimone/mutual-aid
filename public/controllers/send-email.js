const nodemailer = require('nodemailer');

module.exports.sendmail=function(req,res){
  console.log("in function");
    let userName=req.body.fullname;
    let userEmail=req.body.emailAdd;
    let userMessage=req.body.message;
    console.log("User name: " + userName);
    console.log("User Email: " + userEmail);
    console.log("User Message: " + userMessage);
    if(userEmail == "" || userMessage == "") {
      req.flash('contacts', "You must input an email and a message." );
      res.redirect('/');
        return;
    }
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "17cff9e9c405a9",
        pass: "3470a05f232c6e"
      }
    });
    const message = {
      from: userEmail,
      to: 'mutualAidAdmin@wwu.edu',
      subject: 'Message from Mutual Aid Website',
      text: userMessage
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          req.flash('contacts', err );
          res.redirect('/');
          return;
        } else {
          console.log(info);
          req.flash('contacts', "" );
          res.redirect('/');
          return;
        }
    });
    return;
}
