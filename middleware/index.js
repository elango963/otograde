const request = require('request'),
	merge = require('merge'),
	url = require('url'),
	jwtDecode = require('jwt-decode'),
	createError = require('http-errors');

const verifyAjaxRequest = (req, res, next) => {
	if (req.xhr)
		next();
	else
		res.status(401).send({ status: "unauthorized" });
};

const auth =  (req, res, next) => {
	if (req.session.user)
		next();
	else
		res.redirect("/login");
};

module.exports = () => {
	return {
		verifyAjaxRequest: verifyAjaxRequest,
		auth: auth
	};
};