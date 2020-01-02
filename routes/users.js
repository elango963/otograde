var express = require('express');
var router = express.Router(),
	request = require('request'),
    middleware = require('../middleware')();
    authController = require('../controller/AuthController')();

/* GET users listing. */

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.post('/ajax/login', middleware.verifyAjaxRequest, authController.loginUser);
router.post('/ajax/register', middleware.verifyAjaxRequest, authController.registerUser);

module.exports = router;
