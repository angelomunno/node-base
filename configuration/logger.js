
var winston = require('winston');

winston.emitErrs = true;

// levels in winston: silly=0(lowest), debug=1, verbose=2, info=3, warn=4, error=5(highest)

var logger = new winston.Logger({

    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],

    exitOnError: false
});

module.exports = logger;

module.exports.stream = {

    write: function(message, encoding) {

        logger.info(message);
    }
};
