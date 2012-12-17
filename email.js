var nodemailer = require("nodemailer"),
    secret     = require(__dirname + "/secret.js"),
    fs         = require("fs"),
    jade       = require("jade");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Mandrill",
    auth: secret.email
});

exports.send = function(user) {
    // send mail with defined transport object
    if(user == null) return;
    var template = jade.compile(fs.readFileSync(__dirname+'/email/signup.jade', 'utf8'));
    var html = template({
        name: user.name,
        email: user.email
    });

    var opts = {
        from: "mHacks <no-reply@mhacks.org>", // sender address
        //replyTo: "hackathon@umich.edu",
        to: user.name+" <"+user.email+">", // list of receivers
        subject: "Welcome To mHacks!", // Subject line
        html: html, // html body
        generateTextFromHTML: true
    }
    console.log(opts);

    // send the email
    smtpTransport.sendMail(opts, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
};
