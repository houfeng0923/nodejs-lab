#!/usr/bin/env node
'use strict';
var app = require('../app'),
    logger = require('midway').getLogger(),
    graceful = require('graceful');

app.set('port', process.env.PORT || 6001);

var server = app.listen(app.get('port'), function() {
    logger.info('Midway server listening on port ' + server.address().port);
});

graceful({
    server: server,
    killTimeout: 30 * 1000,
    error: function(err, throwErrorCount) {
        if (err.message) {
            err.message +=
                ' (uncaughtException throw ' + throwErrorCount +
                ' times on pid:' + process.pid + ')';
        }
        logger.error(err);
    }
});
