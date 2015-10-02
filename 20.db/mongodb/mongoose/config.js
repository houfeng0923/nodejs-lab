'use strict';

// Requires
var mongoose = require('mongoose');
var Promise = require('bluebird');
var config = require('./config');
var logger = config.logger;
/******************************************************
 * Initialize mongo connection
 ******************************************************/


module.exports = {

  initialize: function (app){
    var self = this;
    this.initialize = function (){}
    return new Promise(function(resolve, reject){
      mongoose.connection.on('error', function(err){
        logger.error('mongodb connection error:', err.message);
        reject(err);
      });
      mongoose.connection.once('connected',function(){
        logger.info('mongodb connection success!');
        resolve(mongoose.connection);
        self._autoClose();
      });
      mongoose.connect(config.mongo.uri);
    }).then(function(){
      logger.info('mongodb init system config data.');
      var sysConfig = require('./seed/initSysConfig');
      return sysConfig.initConfigData();
    });
  },

  close: function(){
    var conn = mongoose.connection;
    return new Promise(function(resolve, reject){
        mongoose.connection.close(function(err){
          if(err){
            return reject(err);
          }
          resolve();
        });
    }).then(function(){
        logger.info('mongodb connection closed!');
    });
  },

  meta: function(){
    return config.mongo;
  },

  _autoClose: function(){
    process.on('SIGINT', function() {
      this.close().then(function(){
        process.exit(0);
      })
    }.bind(this));
  }

};

