'use strict';

var DataProxy = require('midway').getPlugin('dataproxy'),
    HomeData  = new DataProxy({
        fetch: 'Midway.HomeData'
    });

exports.index = function(req, res, next) {

    HomeData.fetch()
        .done(function(data) {
            res.render('home', data);
        })
        .fail(function(err) {
            next(err);
        });
};
