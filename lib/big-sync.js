var Rsync = require('rsync'),
    _ = require('lodash'),
    util = require('../lib/util'),
    config = util.getConfig();

module.exports = function bigSync(onComplete) {

    if (_.isEmpty(config)) {
        return console.log('Please run `sicksync --setup` before doing a one-time sync');
    }

    var rsync = new Rsync()
        .shell('ssh')
        .flags('az')
        .exclude(config.excludes)
        .source(config.sourceLocation)
        .destination(config.hostname + ':' + config.destinationLocation);

    rsync.execute(onComplete);
};