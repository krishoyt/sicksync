var spawn = require('child_process').spawn,
    util = require('../lib/util'),
    config = util.getConfig(),
    server = spawn('ssh', [config.userName + '@' + config.hostname, '"sicksync-remote"']);

server.stdout.pipe(process.stdout);

server.stderr.on('data', function(data) {
    console.log('[' + config.hostname + '] [ERR] ' + data);
});

server.on('close', function (code) {
    console.log('[' + config.hostname + '] Closed with code: ' + code);
});

server.stdout.on('data', function(buf) {
    if (buf.toString().indexOf('up and waiting') > -1) process.send(buf);
});
