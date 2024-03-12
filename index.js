'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

// log requests
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000);
console.log('listening on port 3000');
