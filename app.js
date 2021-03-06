
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , secret = require('./secret.js');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT | 1024);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('A#cv$S7BVSwlsp#@&x@&*!'));
  app.use(express.session());

  app.use('/admin', express.basicAuth(function(user, pass){
    return secret.admin.user == user & secret.admin.pass == pass;
  }));

  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));


});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get("/", function(req, res) {
  res.send("big things happening. please standby :)")
})
app.get('/secret', routes.home);
app.post('/signup', routes.signup);
app.get('/email', routes.email);

//pwd protected
app.get('/admin', routes.admin); 
//app.get('/resend', routes.resend);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
