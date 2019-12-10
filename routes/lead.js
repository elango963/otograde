var express = require('express');
var router = express.Router();
const fs = require('fs');
var data = {}
var menu = fs.readFileSync('config/left_side_menu.json');
var state = fs.readFileSync('config/state.json');
data.menu = JSON.parse(menu);
/* GET home page. */
router.get('/create', function(req, res, next) {
	data.active = 'create';
	data.statelist = JSON.parse(state);
  	res.render('lead/create', { data : data });
});
router.get('/inbox', function(req, res, next) {
	data.active = 'inbox';
	data.inboxlist = [
		{
			"client_name" : "Cholamandalam",
			"exec_name" : "anand",
			"exec_number" : "9962334455",
			"lead_id" : "CHOLA4W34544",
			"veh_modal" : "Maruti Alto",
			"model_lunching_year" : "2011",
			"veh_number" : "TN20AX5329",
			"created_at" : "05/12/2019 09:30:00"
		}
	];
  	res.render('lead/inbox', { data : data });
});

module.exports = router;
