var MongoDB 	= require("mongodb"),
	secret 		= require(__dirname+"/secret.js");

var API = module.exports = exports;

(function(MongoDB) {
	var Server		= MongoDB.Server("alex.mongohq.com", 10095)
		, Database	= MongoDB.Db("mhacks", Server, {safe: true})
	;

	API.initMongoDB = function initMongoDB(cb) {
		Database.open(function(err, db) {
			if(err) { return cb(err); }
			Database.authenticate(secret.db.user, secret.db.pass, cb);
			API.db = Database;
		});
	};

})(require("mongodb"));
