/*import Common from "./common/helper";
new Common();
*/
$(function () {
	//Initialize Select2 Elements
	$('.select2').select2()
	
	//Initialize Select2 Elements
	$('.select2bs4').select2({
		theme: 'bootstrap4'
	})
	$(".js-monthyearmask").datepicker({
		format: "mm-yyyy",
		viewMode: "months", 
		minViewMode: "months"
	})
	$(".js-datemonthyearmask").datepicker({ format: "dd-mm-yyyy" })
	$('.js-monthyearmask').inputmask('99/9999', { 'placeholder': 'MM/YYYY' })
	$('.js-datemonthyearmask').inputmask('99/99/9999', { 'placeholder': 'DD/MM/YYYY' })
	var table = $('.js_lead_show').DataTable({
		"paging": true,
		"lengthChange": true,
		"searching": true,
		"ordering": true,
		"info": true,
		"autoWidth": true
	})
	table.on( 'draw', function () {
        var body = $( table.table().body() );
        body.unhighlight();
        body.highlight( table.search() );  
    });


	$.validator.addMethod("alphanumeric", function(value, element) {
	    return this.optional(element) || /^[\w.]+$/i.test(value);
	}, "Letters, numbers, and underscores only allowed");

	jQuery.validator.addMethod("validDate", function(value, element) {
		return this.optional(element) || moment(value,"DD/MM/YYYY").isValid();
	}, "Please enter a valid date format DD/MM/YYYY");

	jQuery.validator.addMethod("validMonthYear", function(value, element) {
		return this.optional(element) || moment(value,"MM/YYYY").isValid();
	}, "Please enter a valid format MM/YYYY");

	var validationSettings = {
		errorElement: "span",
		errorPlacement: function ( error, element ) {
			error.addClass("error-block col-sm-12");
			console.log($(element));
			$(element).closest(".form-group").append(error);
		},
		highlight: function ( element, errorClass, validClass ) {
			$(element).closest(".form-group").addClass("has-error").removeClass("has-success");
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).closest(".form-group").addClass("has-success").removeClass("has-error");
		}
	}
	var errorElement = {
		ignoreTitle: true,
		validClass: "success",
		errorClass: "error",
		rules: {
			client_name: {
				required:true,
				alphanumeric: true
			},
			client_state: {
				required:true
			},
			client_city: {
				required:true
			},
			inspectionType: {
				required:true
			},
			vehicleCategory: {
				required:true
			},
			registrationType: {
				required:true
			},
			registrationNumber: {
				required:true
			},
			loanAgreementNumber: {
				required:true
			},
			modelNumber: {
				required:true
			},
			engineNumber: {
				required:true
			},
			chassisNumber: {
				required:true
			},
			numberOfOwners: {
				required:true
			},
			registrationStatus: {
				required:true
			},
			mfgDate: {
				required:true,
				validMonthYear:true
			},
			regDate: {
				required:true,
				validDate:true
			},
			customerName: {
				required:true,
				alphanumeric: true
			},
			customerMobileNumber: {
				required:true,
				minlength:9,
				maxlength:10,
				number: true
			},
			customerAddress1: {
				required:true
			},
			customerAddress2: {
				required:true,
				alphanumeric: true
			},
			customerCity: {
				required:true
			},
			customerState: {
				required:true
			},
			customerZipcode: {
				required:true,
				minlength:5,
				maxlength:6,
				number: true
			},
			executiveName: {
				required:true
			},
			executiveNumber: {
				required:true,
				minlength:9,
				maxlength:10,
				number: true
			}
		}
	};
	$("#js_lead_creation_form").validate(Object.assign({}, errorElement, validationSettings));
	var tabindex = 1;
	$('input, select').each(function(e) {
		$(this).attr("tabindex", tabindex);
		tabindex++;
	});
	$(document).on('focus', '.select2', function() {
    	$(this).siblings('select').select2('open');
	});
	$(document).on('change', '.select2', function() {
    	$(this).valid();
	});
	$("#js_lead_creation_form").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        var $this = $(e.currentTarget);
        if ($this.valid()) {
			$.ajax({
				url: '/ajax/leadcreate',
				type: 'post',
				dataType: 'application/json',
				data: $("#js_lead_creation_form").serialize(),
				success: function(data) {
					alert(data);
				}
			});
		}
    });
})