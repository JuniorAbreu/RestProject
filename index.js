const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();

require('./server/index')(app);
require('./server/src/routes')(app);
app.use(express.static(path.join(__dirname, 'public')));