const request = require('request'),
	merge = require('merge'),
	url = require('url'),
	jwtDecode = require('jwt-decode'),
	createError = require('http-errors');

const loginUser = (req, res, next) => {
	request.post({
		url: process.env.LOGIN_API,
		json: {
			email: req.body.email,
			password: req.body.password
		}
	}, (err, httpResponse, body) => {
		if (err || httpResponse.statusCode !== 200) {
			res.send({ status: "An error occured" }).status(500);
		} else {
			req.session.user = body.data;
			res.send(body);
		}
	});
};

const registerUser = (req, res, next) => {
	request.post({
		url: process.env.REGISTER_API,
		json: {
			email: req.body.email,
			password: req.body.password,
			confirm_password: req.body.confirmPassword,
			first_name: req.body.firstName,
			last_name: req.body.lastName
		}
	}, (err, httpResponse, body) => {
		if (err || httpResponse.statusCode !== 200) {
			res.send({ status: "An error occured" }).status(500);
		} else {
			req.session.user = body.data;
			res.send(body);
		}
	});
};

module.exports = () => {
	return {
		loginUser: loginUser,
		registerUser: registerUser,
	};
};