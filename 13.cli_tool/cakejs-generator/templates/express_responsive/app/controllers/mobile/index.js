exports = module.exports = function(req, res, next) {
    res.renderX('index', {
        responsive: req.headers.responsive
    });
};

exports.test = function(req, res, next) {
    res.send(200, {
        responsive: res.get('responsive')
    });
};
