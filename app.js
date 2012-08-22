var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sys = require('util');


var app = express();
 

app.configure(function(){
  app.set('port', process.env.PORT || 31415);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
      var h = (new Date()).getHours();
			var i=0;
			var hours = [];
			var offset = 0;
			var index=0;
			for(i=0;i<24;i++){
				offset = Math.abs((i-h) % 24);
        hours[i] = offset;
			}
		  res.render('index', {title: 'The Office Coffee Pot',
      hours: hours
			});
	});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

