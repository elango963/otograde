const request = require('request'),
	Promise = require("bluebird"),
	fs = require('fs'),
	jwtDecode = require("jwt-decode"),
	merge = require('merge'),
	path = require('path'),
	_ = require('lodash');


module.exports = () => {
	const leadCreation = (req, res) => {
		req.checkBody('client_name', 'type is required').notEmpty();
		req.checkBody('vehicleCategory', 'makeName is required').notEmpty();
		req.getValidationResult().then(error => {
			if (error.isEmpty() === false) res.status(422).send({ status: "error" });
			else {
				var json = {
					client_name: req.body.client_name,
					client_state: req.body.client_state,
					client_city: req.body.client_city,
					vehicleCategory:req.body.vehicleCategory,
					registrationType:req.body.registrationType,
					registrationNumber:req.body.registrationNumber,
					loanAgreementNumber:req.body.loanAgreementNumber,
					modelNumber:req.body.modelNumber,
					engineNumber:req.body.engineNumber,
					chassisNumber:req.body.chassisNumber,
					numberOfOwners:req.body.numberOfOwners,
					registrationStatus:req.body.registrationStatus,
					mfgDate:req.body.mfgDate,
					regDate:req.body.regDate,
					customerName:req.body.customerName,
					customerMobileNumber:req.body.customerMobileNumber,
					customerAddress1:req.body.customerAddress1,
					customerAddress2:req.body.customerAddress2,
					customerCity:req.body.customerCity,
					customerState:req.body.customerState,
					customerZipcode:req.body.customerZipcode,
					executiveName:req.body.executiveName,
					executiveNumber:req.body.executiveNumber
				};
				request({
					uri: process.env.LEAD_CREATION_API,
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify(json),
				}, (err, response, body) => {
					if (!err && response.statusCode == 200) {
						res.status(200).send({ status: "success" });
					} else {
						res.status(500).send({ status: "error" });
					}
				});
			}
		});
	};

	return {
		leadCreation: leadCreation
	};
};