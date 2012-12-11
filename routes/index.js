
/*
 * GET home page.
 */
var mongo = require("../databases.js");
mongo.initMongoDB();

exports.home = function(req, res){
  //need page for this
  res.render('home');
};

exports.signup = function signup(req ,res) {
  console.log(req.body);
  mongo.db.collection("signup", function (err, collection) {
    if(err) throw err
      collection.insert(req.body, function(err, collection) {
        if(err) res.send("Something is wrong, email ottosipe@umich.edu and complain!");
        else res.send("<h3> Thanks for signing up. </h3>");
      });
  });
  
}


