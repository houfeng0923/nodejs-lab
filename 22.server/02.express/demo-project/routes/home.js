
var express = require('express');
var router = express.Router();
var home = require('../lib/controller/home');

router.get('/', home.index);
router.post('/', home.create);
router.get('/:id', home.detail);
router.post('/:id', home.update);

module.exports = router;
