var express = require('express');
var http = require('http');
var app = express();
var router = require('./router');
var logger = require('morgan');

http.createServer(app).listen(9999);

if (process.env.NODE_ENV == "development") {
	app.use(logger('dev'));
}


if (process.env.NODE_ENV == "production") {
	app.enable('view cache');
}

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(logger('dev'));
app.use("/", router);
app.use('/', express.static(__dirname + '/public'));













