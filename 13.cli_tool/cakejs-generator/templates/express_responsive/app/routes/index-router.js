var express = require('express');
var router = express.Router();

var getController = require('midway').getPlugin('responsive').requireController;
router.get('/', getController('index'));
router.get('/index/test', getController('index:test'));

module.exports = router;
