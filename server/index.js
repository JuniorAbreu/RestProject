module.exports = function(app){

	var https 		= require('https');
	var bodyParser 	= require('body-parser');
	var session 	= require('express-session');
	var fs 			= require('fs');
	var cors 		= require('cors');
    var port = 9454;

	app.use(cors());

	app.use(bodyParser.json({limit: '100mb'}));
	app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 50000 }));

	// START OF CHANGE
	app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat'}));

	// Disable http - only https is enabled
	app.listen(port, function() {
		console.info("To view your app, open this link in your browser: http://localhost:" + port);
	});

    // running LOCALLY
    app.set('port_https', 9443);
    app.all('*', function(req, res, next) {
        if (req.secure) {
            return next();
        };
        res.redirect('https://' + req.hostname + ':' + app.get('port_https') + req.url);
    });

    // Setup HTTPS
    var options = {
        key: fs.readFileSync(__dirname + '/certs/key.pem'),
        cert: fs.readFileSync(__dirname + '/certs/cert.pem')
    };
    var secureServer = https.createServer(options, app).listen(app.get('port_https'));
    console.info("To view your app, open this link in your browser: https://localhost:" + app.get('port_https'));

}
