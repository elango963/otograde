import { ajax, snakeToCamel, initAjax } from "./common/utils";

const processLogin = () => {
	$("#login").on("submit", (e) => {
		e.preventDefault();
		const $this = e.target;
		var json = {};
		console.info($($this).serializeArray());
		$($this).serializeArray().map((input) => {
			json[snakeToCamel(input["name"])] = input["value"];
		});
		ajax("/ajax/login", "POST", json, (response) => {
			if (response.code == 200) {
				window.location = "/lead/create";
			}
		}, (error) => {
			alert("An error occoured");
		});
		
	});
};

const processRegister = () => {
	$("#register").on("submit", (e) => {
		e.preventDefault();
		const $this = e.target;
		var json = {};
		console.info($($this).serializeArray());
		$($this).serializeArray().map((input) => {
			json[snakeToCamel(input["name"])] = input["value"];
		});
		ajax("/ajax/register", "POST", json, (response) => {
			if (response.code == 200) {
				window.location = "/lead/create";
			}
		}, (error) => {
			alert("An error occoured");
		});
		
	});
};

initAjax();
processLogin();
processRegister();