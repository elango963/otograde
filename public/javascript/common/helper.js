import jQuery from "../../plugins/jquery/jquery";
window.$ = window.jQuery = jQuery;

export default class Helper {
	constructor() {
		this.initAjax();
	}

	initAjax() {
		$.ajaxSetup({
			cache: true,
			headers: {
				"X-CSRF-Token": $("#csrfToken").val(),
			},
		});
	}
}


new Helper();