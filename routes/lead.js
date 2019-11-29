var express = require('express');
var router = express.Router();
const fs = require('fs');
var data = {}
var menu = fs.readFileSync('config/left_side_menu.json');
var state = fs.readFileSync('config/state.json');
data.menu = JSON.parse(menu);
data.statelist = JSON.parse(state);
/* GET home page. */
router.get('/create', function(req, res, next) {
	data.active = 'create';
  	res.render('lead/create', { data : data });
});


module.exports = router;
