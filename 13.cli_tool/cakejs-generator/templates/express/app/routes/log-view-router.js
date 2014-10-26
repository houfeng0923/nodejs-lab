'use strict';
var midway = require('midway'),
    isProd = midway.getInfo().isProd(),
    logger = midway.getLogger();

var LOG_DIR = (midway.getConfig().getField('logger') || {}).logdir,
    logView = require('@ali/midway-log-view');

module.exports = function (app) {
    // don't allow log view in prod env for security reasons
    if (isProd) {
        return;
    }

    if (!LOG_DIR) {
        logger.error( 'Failed to init log view because there is no log path configured!' );
        return;
    }
    try {
        app.get('/_midway/logview', logView(LOG_DIR));
    } catch (ex) {
        logger.error(ex);
    }

};