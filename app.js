const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 50000 }));
app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat'}));

require('./server/src/routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
    console.info("To view your app, open this link in your browser: http://localhost:" + port);
});