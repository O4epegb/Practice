'use strict';

var express = require('express');
var app = express();

app.use(express.static('public'));

var logger = require('./logger');
app.use(logger);

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

var port = 3000;
app.listen(port, function() {
  console.log('Running Express, listening to the ' + port + ' port');
});
