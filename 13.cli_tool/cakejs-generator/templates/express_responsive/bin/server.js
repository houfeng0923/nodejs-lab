#!/usr/bin/env node
'use strict';
var path = require('path'),
    recluster = require('recluster'),
    logger    = require('midway').getLogger();

var cluster = recluster(path.join(__dirname, 'app.js'));
cluster.run();

process.on('SIGUSR2', function() {
    logger.warn('Got SIGUSR2, reloading cluster...');
    cluster.reload();
});

logger.warn('spawned cluster, kill -s SIGUSR2 ' + process.pid + ' to reload');
