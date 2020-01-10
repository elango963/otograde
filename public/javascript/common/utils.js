const initAjax = () => {
	$.ajaxSetup({
		cache: true,
		headers: {
			"X-CSRF-Token": $("#csrfToken").val(),
		},
	});
}

const ajax = (url, method="GET", json={}, cb) => {
	$.ajax({
		url: url,
		method: method,
		data: json,
		success: response => {
			if (typeof cb === "function")
				cb(response);
		},
		error: err => {
			if (err.responseJSON && err.responseJSON.reload === true)
				window.location.reload();
			else if (typeof cb === "function")
				cb({ status: "error" });
		},
	});
};

const ajaxUpload = (url, formData, cb) => {
	$.ajax({
		url: url,
		method: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: response => {
			if (typeof cb === "function")
				cb(response);
		},
		error: err => {
			if (err.responseJSON && err.responseJSON.reload === true)
				window.location.reload();
			else if (typeof cb === "function")
				cb({ status: "error" });  
		},
	});
};

const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
);

export {
	initAjax,
	ajax,
	ajaxUpload,
	snakeToCamel
};