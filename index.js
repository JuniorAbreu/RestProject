const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();

require('./server/index')(app);
require('./server/src/routes')(app);

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));