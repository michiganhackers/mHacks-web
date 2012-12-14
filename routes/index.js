
/*
 * GET home page.
 */
var mongo = require("../databases.js"),
    email = require("../email.js")

mongo.initMongoDB();

exports.home = function(req, res){
  //need page for this
  res.render('home');
};

exports.email = function(req, res) {
  res.render('../email/signup.jade', {name:"otto", email:"ottosipe@gmail.com"});
}

exports.signup = function signup(req ,res) {
  try {
    mongo.db.collection("signup", function (err, collection) {
      if(err) throw err
      collection.insert(req.body, function(err, collection) {
        if (err) throw err;

        res.send("<h3> Thanks for signing up. </h3><h4> Updates to come soon.</h4>");
        
        // send email confirmation
        email.send(req.body); 

      });
    });
  } catch (err) {
    res.send("<h4>Sorry something went wrong.</h4> Contact ottosipe@umich.edu");
    console.log(err);
    
  }
}