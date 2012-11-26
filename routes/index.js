
/*
 * GET home page.
 */
var mongo = require("../databases.js");
mongo.initMongoDB();

var verbs = ['code','hack','learn','build','think','test'];
var eventName = 'MHACKS'
exports.index = function(req, res){
	i = Math.floor(Math.random()*verbs.length);
	// eventually this might be cooler to have change after page load?
	// easy switch
  res.render('index');
};

exports.teaser = function(req, res){
  i = Math.floor(Math.random()*verbs.length);
  //need page for this
  res.render('teaser');
};

exports.signup = function signup(req ,res) {
  console.log(req.body);
  mongo.db.collection("signup", function (err, collection) {
    if(err) throw err
      collection.insert(req.body, function(err, collection) {
        if(err) res.send("Something is wrong, email ottosipe@umich.edu and complain!");
        else res.send("<h3> Thanks for signing up. </h3> <p>More info to come.</p>");
      });
  });
  
}

exports.about = function(req, res){
	i = Math.floor(Math.random()*verbs.length);
	//need page for this
  res.render('about');
};

exports.prizes = function(req, res){
 //need page for this
  res.render('prizes');
};

exports.schedule = function(req, res){
 	//need page for this
  res.render('schedule');
};

exports.sponsors = function(req, res){
 //need page for this
  res.render('sponsors');
};

exports.contact = function(req, res){
 //need page for this
  res.render('contact');
};




