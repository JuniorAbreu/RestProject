module.exports = function(app){

	var bodyParser 	= require('body-parser');
	var session 	= require('express-session');
	var cors 		= require('cors');
    var port = process.env.PORT || 8080;

	app.use(cors());

	app.use(bodyParser.json({limit: '100mb'}));
	app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 50000 }));
	app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat'}));

	app.listen(port, function() {
		console.info("To view your app, open this link in your browser: http://localhost:" + port);
	});

}
