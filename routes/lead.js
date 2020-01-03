var express = require('express');
var router = express.Router();
request = require('request');
const fs = require('fs');
var data = {}
var menu = fs.readFileSync('config/left_side_menu.json');
data.menu = JSON.parse(menu);
var wkhtmltopdf = require('wkhtmltopdf');

router.get('/create', function(req, res, next) {
	data.active = 'create';
	// req.session.user.auth = "Bearer ya29.c.Kl6bBzrFChMW4xC-RFI7CZcmKicSl_9KxmqV51p92oX9RVAt0trnOjlnBc6NdxulVDjroa16gJAcCfIjgqk-VH8yW7i_PEMwK87KPXc53fx_lJUkZXdTGBGAG2PfcC33"
	request({
		uri: process.env.LEAD_CREATE_PAGE_API,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': "Bearer ya29.c.Kl6bBzrFChMW4xC-RFI7CZcmKicSl_9KxmqV51p92oX9RVAt0trnOjlnBc6NdxulVDjroa16gJAcCfIjgqk-VH8yW7i_PEMwK87KPXc53fx_lJUkZXdTGBGAG2PfcC33"
		},
		method: 'GET',
		body: JSON.stringify({
			ip: req.clientIp
		}),
	}, (err, response, body) => {
		if (err || response.statusCode !== 200) {
			req.flash('flashMessage', 'Oops something went wrong! Please try again later.');
			res.redirect('/');
		} else {
			body = JSON.parse(body);
			var newData = Object.assign(body.data, data);
			res.render('lead/create', { data: newData });
		}
	});
});
router.get('/edit/:id', function(req, res, next) {
	data.active = 'inbox';
	// req.session.user.auth = "Bearer ya29.c.Kl6bBzrFChMW4xC-RFI7CZcmKicSl_9KxmqV51p92oX9RVAt0trnOjlnBc6NdxulVDjroa16gJAcCfIjgqk-VH8yW7i_PEMwK87KPXc53fx_lJUkZXdTGBGAG2PfcC33"
	console.log(`${process.env.LEAD_EDIT_PAGE_API}/${req.params.id}`);
	request({
		uri: `${process.env.LEAD_EDIT_PAGE_API}/${req.params.id}`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': "Bearer ya29.c.Kl6bBzrFChMW4xC-RFI7CZcmKicSl_9KxmqV51p92oX9RVAt0trnOjlnBc6NdxulVDjroa16gJAcCfIjgqk-VH8yW7i_PEMwK87KPXc53fx_lJUkZXdTGBGAG2PfcC33"
		},
		method: 'GET',
		body: JSON.stringify({
			ip: req.clientIp
		}),
	}, (err, response, body) => {
		console.log(err);
		if (err || response.statusCode !== 200) {
			req.flash('flashMessage', 'Oops something went wrong! Please try again later.');
			res.redirect('/lead/inbox');
		} else {
			body = JSON.parse(body);
			var newData = Object.assign(body.data, data);
			res.render('lead/create', { data: newData });
		}
	});
});

router.get('/:title(remarks|article2|article3)/:id', function(req, res, next) {
	data.active = 'inbox';
	data.title = req.params.title;
	data.id = req.params.id;
	res.render('lead/action', { data: data });
});

router.get('/inbox', function(req, res, next) {
	data.active = 'inbox';
	data.inboxlist = [{
		"id": "1",
		"client_name": "Cholamandalam",
		"exec_name": "anand",
		"exec_number": "9962334455",
		"lead_id": "CHOLA4W34544",
		"veh_modal": "Maruti Alto",
		"model_lunching_year": "2011",
		"veh_number": "TN20AX5329",
		"created_at": "05/12/2019 09:30:00"
	}];
	res.render('lead/inbox', { data: data });
});

router.get('/assigned-list', function(req, res, next) {
	data.active = 'assigned';
	data.inboxlist = [{
		"id": "1",
		"client_name": "Cholamandalam",
		"exec_name": "anand",
		"exec_number": "9962334455",
		"lead_id": "CHOLA4W34544",
		"veh_modal": "Maruti Alto",
		"model_lunching_year": "2011",
		"veh_number": "TN20AX5329",
		"created_at": "05/12/2019 09:30:00"
	}];
	res.render('lead/assigned-list', { data: data });
});

router.get('/re-assigned-list', function(req, res, next) {
	data.active = 're-assigned';
	data.inboxlist = [{
		"id": "1",
		"client_name": "Cholamandalam",
		"exec_name": "anand",
		"exec_number": "9962334455",
		"lead_id": "CHOLA4W34544",
		"veh_modal": "Maruti Alto",
		"model_lunching_year": "2011",
		"veh_number": "TN20AX5329",
		"created_at": "05/12/2019 09:30:00"
	}];
	res.render('lead/re-assigned-list', { data: data });
});

router.get('/valuation/:id', function(req, res, next) {
	data.active = 'assigned';
	data.question = {};
	data.question.rating = JSON.parse(fs.readFileSync('config/valuator-form-rating-question.json'));
	res.render('lead/valuator-form', { data: data });
});

router.get('/report/preview/:id', function(req, res, next) {
	data.active = 're-assigned';
	res.render('lead/report-preview', { data: data });
});

router.get('/report/preview/:id/pdf', function(req, res, next) {
	data.active = 're-assigned';
	res.render('lead/report-preview', { data: data }, (err, html) => {
		wkhtmltopdf(html)
  		.pipe(res);
	});
	
});

module.exports = router;