var express = require('express');
var router = express.Router();

var getController = require('midway').getPlugin('responsive').requireController;
router.get('/item/:id', getController('item'));

module.exports = router;
