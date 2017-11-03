var mongoose = require("mongoose");
var config = require('./config');
var logger = require('./logger');

var connectionString = config.dbinfo.protocol + '://' + config.dbinfo.db_host + ':' + config.dbinfo.db_port + '/' + config.dbinfo.db_name;

logger.debug('Impostazione del plugin datatable per mongoose.');
var DataTable = require('mongoose-datatable');
DataTable.configure({ verbose: false, debug : false});
mongoose.plugin(DataTable.init);

var createConnection = function(app){
	var option = {
  		useMongoClient: true
	}
    mongoose.connect(connectionString, option, function(err,res){

        if (err) {

                logger.error('Impossibile connettersi a: ' + connectionString);

                return {error:true,message:"Impossibile stabilire una connessione"};
            }
            else {

                conn = mongoose.connection;

                conn.on('connected', function (ref) {

                    logger.info('Connessione effettuata sul server mongo.');
                });

                conn.on('open', function (ref) {

                    logger.info('Connessione aperta su: ' + config.dbinfo.db_name);

                    app.set('mongoose', mongoose);
                });

                conn.on('disconnected', function (ref) {

                    logger.info('Disconnessione effettuata da: ' + config.dbinfo.db_name);
                });

                conn.on('close', function (ref) {

                    logger.info('Connessione chiusa su: ' + config.dbinfo.db_name);
                });

                conn.db.on('reconnect', function (ref) {

                    logger.info('Riconnessione effettuata su: ' + config.dbinfo.db_name);
                });
            }
    });
}

module.exports = {
    createConnection:createConnection
};
