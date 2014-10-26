'use strict';

var AnotherController = require('../controllers/another-controller');

var router = require('express').Router();
router.get('/another', AnotherController.index);

module.exports = router;
