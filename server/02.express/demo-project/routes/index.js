


var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.redirect('/home');
});

router.get('/50x', function(req, res) {
    res.render('50x', {
        title: '异常',
        error: {
            message: '系统异常'
        }
    });
});
// router 设置在最后面
router.get('*', function(req, res) {
    res.render('404');
});

module.exports = router;