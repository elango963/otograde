
export const ajax = (url, method, data, successCallBack = () => {}, errorCallBack = () => {}) => {
	$.ajax({
		url: url,
		data: method.toLowerCase() == 'post' ? JSON.stringify(data) : data,
		method: method,
		dataType: "json",
		contentType: "application/json",
		success: (response) => {
			successCallBack(response);
		},
		error: (error) => {
			errorCallBack(error);
		}
	})
};


export const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
);
