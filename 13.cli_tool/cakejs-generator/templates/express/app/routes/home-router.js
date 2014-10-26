'use strict';

var HomeController = require('../controllers/home-controller');

var router = require('express').Router();
router.get('/', HomeController.index);

module.exports = router;
