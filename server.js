var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var database = require('./configuration/database');
var config = require('./configuration/config');
var path = require('path');
var logger = require('./configuration/logger');

var port = process.env.port || 4100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({    
  extended: true
}));

database.createConnection(app);

app.use('/', express.static(__dirname + '/public'));

app.listen(port,function(){
    logger.info('Server in esecuzione -> http://%s:%d/ ',"localhost",port);
});

//routes
config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {

    var name = path.basename(routePath, '.js');

    //var modulo = require(path.resolve(routePath))(app);
    var modulo = require(path.resolve(routePath));

    logger.info('Utilizzo del modulo di rotta ' + name);
    app.use('/' + name, modulo);
});