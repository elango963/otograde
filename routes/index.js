var express = require('express');
var router = express.Router();
var data = {}
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
	data.active = 'dashboard';
	res.render('dashboard', data);
});

module.exports = router;
