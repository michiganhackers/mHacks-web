var MongoDB 	= require("mongodb"),
	secret 		= require(__dirname+"/secret.js");

var API = module.exports = exports;

(function(MongoDB) {
	var Server		= MongoDB.Server("alex.mongohq.com", 10095)
		, Database	= MongoDB.Db("mhacks", Server, {safe: false})
	;

	API.initMongoDB = function initMongoDB(cb) {
		Database.open(function(err, db) {
			if(err) { return cb(err); }
			Database.authenticate(secret.user, secret.pass, cb);
			API.db = Database;
		});
	};

})(require("mongodb"));
