const request = require('request'),
	Promise = require("bluebird"),
	fs = require('fs'),
	jwtDecode = require("jwt-decode"),
	merge = require('merge'),
	path = require('path'),
	multiparty = require('multiparty'),
	_ = require('lodash'),
	multer = require("multer");

var data = {}
var menu = fs.readFileSync('config/left_side_menu.json');
data.menu = JSON.parse(menu);
const upload = multer({
  dest: "./public/reports/"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

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
const saveAnswers = (req, res) => {
	req.checkBody('form', 'form is required').notEmpty();
	req.checkBody('leadId', 'leadId is required').notEmpty();
	req.checkBody('questionSlug', 'questionSlug is required').notEmpty();
	req.checkBody('answer', 'answer is required').notEmpty();
	req.getValidationResult().then(error => {
		if (error.isEmpty() === false) res.status(422).send({ status: "error" });
		else {
			request({
				uri: process.env.SAVE_ANSWER_API,
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(req.body),
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
const saveAllAnswers = (req, res) => {
	req.checkBody('form_type', 'type is required').notEmpty();
	req.getValidationResult().then(error => {
		if (error.isEmpty() === false) res.status(422).send({ status: "error" });
		else {
			request({
				uri: process.env.SAVEALL_ANSWER_API,
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(req.body),
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

const getReportTabData = (req, res) => {
	req.checkBody('leadId', 'lead details is required').notEmpty();
	req.getValidationResult().then(error => {
		if (error.isEmpty() === false) res.status(422).send({ status: "error" });
		else {
			request({
				uri: `${process.env.REPORT_TAB_DETAIL_API}/${req.body.leadId}/${req.params.tabname}`,
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'GET',
				body: JSON.stringify({
					ip: req.clientIp
				}),
			}, (err, response, body) => {
				console.log(err);
				if (err || response.statusCode !== 200) {
					res.status(200).send({ status: "error", data: 'Oops something went wrong! Please try again later.' });
				} else {
					body = JSON.parse(body);
					var fileName = "lead/valuator-form-" + body.tabname;
					res.render(fileName, {
						data: body.data
					}, (err, html) => {
						console.log(err);
						if (err)
							res.status(200).send({ status: "error", data: err });

						res.status(200).send({ status: "success", data: html });
					});
				}
			});
		}
	});
};
const leadEditPage = (req, res) => {
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
			res.render('lead/edit', {
				data: newData
			}, (err, html) => {
				if (err)
					return next(createError(err));
				res.status(200).send({ status: body.status, data: body.data });
			});
		}
	});
};

const imageUpload = (req, res, next) => {
     getFiles(req).then(formData => {
     	if (formData[0] && formData[0].originalFileName) {
     		formData[0].originalFilename = formData[0].originalFileName;
     	}
    	
    	var requestData = {
			slug: formData[0].slug && formData[0].slug[0] ? formData[0].slug[0] : "",
			originalFileName: formData[0].originalFilename && formData[0].originalFilename[0] ? formData[0].originalFilename[0] : formData[1].file[0].originalFilename,
			file: formData[1].file && formData[1].file[0] && formData[1].file[0].path ? fs.createReadStream(formData[1].file[0].path) : "",
			leadId: formData[0].lead_id && formData[0].lead_id[0] ? formData[0].lead_id[0] : ""
		};
		
		if (formData[1].file && formData[1].file[0].path)
			fs.unlinkSync(formData[1]["file"][0].path);
		// console.log(requestData);
		request({
			uri: process.env.IMAGE_UPLOAD_API,
			headers: {
				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI2ODY1NTQsImV4cCI6ODgwNTMzMzQ4NzcsImNvbnRleHQiOnsiZW1haWwiOm51bGx9fQ.l0Ku0IUCvkDab98wRNt-gYCUH2GNamG0LV_Vfv6BtEY"
			},
			method: "POST",
			formData: requestData,
		}, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				var body = JSON.parse(body);
				res.status(200).send({ status: body.status, data: body.data });
			} else {
				res.status(200).send({ status: "error" });
			}
		});
	}).catch(err => {
		console.error(`${req.originalUrl}: ${err}`);
		res.status(200).send({ status: "error" });
	});
};
const getFiles = req => {
    return new Promise((resolve, reject) => {
        var form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
        	if (!err)
            	resolve([fields ? fields : [], files ? files : []]);
            else
            	reject(err);
        });
    });
};

module.exports = () => {
	return {
		leadCreation: leadCreation,
		leadEditPage: leadEditPage,
		imageUpload: imageUpload,
		saveAnswers: saveAnswers,
		saveAllAnswers: saveAllAnswers,
		getReportTabData: getReportTabData,
		getFiles: getFiles
	};
};