
var _ = require('lodash');

var glob = require('glob');

var getGlobbedFiles = function(globPatterns, removeRoot) {

    var _this = this;

    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    var output = [];

    if (_.isArray(globPatterns)) {

        globPatterns.forEach(function(globPattern) {

            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });

    }
    else if (_.isString(globPatterns)) {

        if (urlRegex.test(globPatterns)) {

            output.push(globPatterns);
        }
        else {

            var files = glob(globPatterns, { sync: true });

            if (removeRoot) {

                files = files.map(function(file) {

                    return file.replace(removeRoot, '');
                });
            }

            output = _.union(output, files);
        }
    }

    return output;
};

var db_config = {
    protocol: "mongodb",
    db_host: "localhost",
    db_port: "27017",
    db_name: "base"
}


module.exports = {
    dbinfo:db_config,
    getGlobbedFiles:getGlobbedFiles,
    verbose:true
}
