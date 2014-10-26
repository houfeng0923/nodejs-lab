'use strict';

exports = module.exports = function(req, res, next) {
    var id = req.param('id');

    res.renderX('item', {
        responsive: req.headers.responsive,
        id: id
    });
};
