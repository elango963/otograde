var express = require('express');
var router = express.Router();
const fs = require('fs');

var data = {}
var menu = fs.readFileSync('config/left_side_menu.json');
data.menu = JSON.parse(menu);
/* GET home page. */
router.get('/', function(req, res, next) {
	data.active = 'dashboard';
	res.render('dashboard', { data: data });
});

router.get('/dashboard', function(req, res, next) {
	data.active = 'dashboard';
	console.log(data)
	res.render('dashboard', { data: data });
});

module.exports = router;
