const request = require('request'),
	merge = require('merge'),
	url = require('url'),
	jwtDecode = require('jwt-decode'),
	createError = require('http-errors');

module.exports = () => {
	const verifyAjaxRequest = (req, res, next) => {
		if (req.xhr)
			next();
		else
			res.status(401).send({ status: "unauthorized" });
	};

	return {
		verifyAjaxRequest: verifyAjaxRequest,
	};
};