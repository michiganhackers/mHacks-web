
/*
 * GET home page.
 */
var mongo = require("../databases.js"),
    email = require("../email.js"),
    secret = require("../secret.js");

mongo.initMongoDB();

exports.home = function(req, res){
  //need page for this
  res.render('home');
};

exports.email = function(req, res) {
  res.render('../email/signup.jade', { name:"otto", email:"ottosipe@gmail.com" });
};

exports.signup = function signup(req ,res) {
  try {
    mongo.db.collection(secret.db_name, function (err, collection) {
      if(err) throw err
      collection.insert(req.body, function(err, collection) {
        if (err) throw err;

        res.send("<span class='big'> Thanks! </span><br/><span class='big'> Updates soon...</span>");
        
        // send email confirmation
        //email.send(req.body); 

      });
    });
  } catch (err) {
    res.send("<span class='big'> Sorry something went wrong. Contact hackathon@umich.edu. </span> ");
    console.log(err);
    
  }
}

exports.admin = function signup(req ,res) {
  try {
    mongo.db.collection(secret.db_name, function (err, collection) {
      if(err) throw err
      collection.find().toArray(function(err, data) {
        if (err) throw err;
        res.json(data);
      });
    });
  } catch (err) {
    res.send("<h4>Sorry something went wrong.</h4> Contact ottosipe@umich.edu");
    console.log(err);
    
  }
}

/*exports.resend = function signup(req ,res) {
  if(req.query.pwd != secret.admin_pwd) {
    res.send("wrong password");
    return;
  }
  try {
    mongo.db.collection(secret.db_name, function (err, coll) {
      if(err) throw err
      res.send("Emails sent");
      coll.find({}, {"_id":0}).each(function(err, doc) {
        if (err) throw err;
        console.log(doc);        
        // send email confirmation
        if(req.query.forsure=="yes")
          email.send(doc); 

      });
    });
  } catch (err) {
    res.send("<h4>Sorry something went wrong.</h4> Contact ottosipe@umich.edu");
    console.log(err);
    
  }
}*/