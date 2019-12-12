/*import Common from "./common/helper";
new Common();
*/
$(function () {
	//Initialize Select2 Elements
	var statelist = $(".statelist").text();
	var zipcodeList = $(".zipcodelist").text();
	statelist = JSON.parse(statelist);
	zipcodeList = JSON.parse(zipcodeList);
	$(".statelist, .zipcodelist").remove();

	$('.select2').select2()
	$(".select2.addtag").select2({
		tags: true,
    	createTag: function(params) {
			var term = $.trim(params.term);
			if(term) {
				term = term.toUpperCase();
			}
			return {id: term, text: term};
		}
	})
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
	$(document).on('change', '.select2[name="client_state"]', function(e) {
        var $this = $(e.currentTarget);
        var cityList = statelist[$this.val()];
        var listItems = [{"id" : "", "text" : ""}];
        cityList.forEach( function(item) {
			var newItem = {};
			newItem.id = item;
			newItem.text = item;
			listItems.push(newItem)
			// Append it to the select
		});
		$('.select2[name="client_city"]').empty().select2({data: listItems});
	});
	$(document).on('change', '.select2[name="customerZipcode"]', function(e) {
        var $this = $(e.currentTarget);
        var zipcodeText = zipcodeList[$this.val()];
        var splitText = zipcodeText.toUpperCase().split(",");
        $('[name="customerCity"]').val(splitText[0]).valid();
        $('[name="customerState"]').val(splitText[1]).valid();
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
				required:true
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
				minlength:10,
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
				required:true
			},
			executiveName: {
				required:true
			},
			executiveNumber: {
				required:true,
				minlength:10,
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