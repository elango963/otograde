import { ajax, snakeToCamel, initAjax } from "./common/utils";

const intialize = () => {
	var uploadedImage = []
	//Initialize Select2 Elements
	var uploadObject = $(".uploadObject").data("value");
	var statelist = $(".statelist").text();
	if (!statelist) {
		var zipcodeList = $(".zipcodelist").text();
		if (statelist) {
			statelist = JSON.parse(statelist);
			zipcodeList = JSON.parse(zipcodeList);
		}
		$(".statelist, .zipcodelist").remove();

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
			autoclose: true,
			minViewMode: "months"
		})
		$(".js-yearmask").datepicker({
			format: "yyyy",
			viewMode: "years", 
			minViewMode: "years",
			autoclose: true
		})
		$(".js-datemonthyearmask").datepicker({ format: "dd-mm-yyyy", autoclose: true })
		$('.js-yearmask').inputmask('9999', { 'placeholder': 'YYYY' })
		$('.js-monthyearmask').inputmask('99/9999', { 'placeholder': 'MM/YYYY' })
		$('.js-datemonthyearmask').inputmask('99/99/9999', { 'placeholder': 'DD/MM/YYYY' })
	}
	
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
	$(document).on('click', '.js_remarks_mdl_popup', function(e) {
		var $this = $(e.currentTarget);
		var targetId = $this.find("i").attr("data-target");
		targetId = targetId.substring(1, targetId.length);
		$(".remarks_mdl_popup").attr("id", targetId);
		$(`#${targetId}`).modal('show');
		$(`#${targetId}`).find(".select2").select2();
	});
	$(document).on('click', '.js_assign_mdl_popup', function(e) {
		var $this = $(e.currentTarget);
		var targetId = $this.find("i").attr("data-target");
		targetId = targetId.substring(1, targetId.length);
		$(".assign_mdl_popup").attr("id", targetId);
		$(`#${targetId}`).modal('show');
		$(`#${targetId}`).find(".select2").select2();
	});

	if ($('[name="customerZipcode"]').val()) {
		$('[name="customerZipcode"]').trigger("change");
	}

	$.validator.addMethod("alphanumeric", function(value, element) {
	    return this.optional(element) || /^[\w.]+$/i.test(value);
	}, "Letters, numbers, and underscores only allowed");

	$.validator.addMethod("validDate", function(value, element) {
		return this.optional(element) || moment(value,"DD/MM/YYYY").isValid();
	}, "Please enter a valid date format DD/MM/YYYY");

	$.validator.addMethod("validMonthYear", function(value, element) {
		return this.optional(element) || moment(value,"MM/YYYY").isValid();
	}, "Please enter a valid format MM/YYYY");

	$.validator.addMethod("numbers", function(value, element) {
        var re = new RegExp("^[1-9][0-9,]*$");
        return this.optional(element) || re.test(value);
    }, "Invalid input (numbers only)");

	$(document).on("keydown", ".js-number-only, .js-rupeesformat", function(e) {
		-1 !== $.inArray(e.keyCode, [46,8,9,27,13,110,190]) || /65|67|86|88/.test(e.keyCode) 
		&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode 
		|| (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 
		105 < e.keyCode) && e.preventDefault();
	});

	$(document).on("keyup", ".js-rupeesformat", function(e) {
		var $this = $(e.currentTarget);
		var number = $this.val().replace(new RegExp(",", "g"), "");

		if (isNaN(number) === false) {
			$this.val(numberFormat(number));
		}
	});

	function numberFormat(number) {
		if (!number)
			return number;
		
		number = Math.round(number).toString();

		var x = number;
		var lastThree = x.substring(x.length - 3);
		var otherNumbers = x.substring(0, x.length - 3);
		
		if (otherNumbers != "")
		    lastThree = "," + lastThree;

		return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
	}

	var validationSettings = {
		errorPlacement: function ( error, element ) {
			if ($(element).closest(".form-group").find(".error").length) {
				$(element).closest(".form-group").find(".error")
					.text(error.text()).show();
			} else {
				error.addClass("error-block col-sm-12");
				$(element).closest(".form-group").append(error);
			}			
		},
		highlight: function ( element, errorClass, validClass ) {
			$(element).closest(".form-group").addClass("has-error").removeClass("has-success");
			
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).closest(".form-group").addClass("has-success").removeClass("has-error");
			if ($(element).closest(".form-group").find(".error").length) {
				$(element).closest(".form-group").find(".error").text(" ");
			}
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
	if ($("#js_lead_creation_form").length)
		$("#js_lead_creation_form").validate(Object.assign({}, errorElement, validationSettings));
	
	if ($("#validator_parivahan_detail_form").length)
		$("#validator_parivahan_detail_form").validate(Object.assign({}, validationSettings));
	if ($("#validator_test_drive_form").length)
		$("#validator_test_drive_form").validate(Object.assign({}, validationSettings));

	if ($("#validator_reviews_form").length)
		$("#validator_reviews_form").validate(Object.assign({}, validationSettings));

	if ($("#validator_general_input_form").length)
		$("#validator_general_input_form").validate(Object.assign({}, validationSettings));

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
	$(document).on("change", ".select2.imageUpload", function(e) {
    	e.preventDefault();
        if ($(this).val()) {
        	var latestVal = $(this).closest(".image-preview-section").find(".imageElement").attr("name");
       		checkDuplicateFound(latestVal, function() {
       			imageUploadValidation(function() {
		        	console.log("return here");
				});
       		});
        }
	});

	function checkDuplicateFound(prevValue, callback) {
		var duplicateCount = 0;
		var selectedObj = [];
		$('.select2.imageUpload:visible').each(function(i, v) {
			$(v).closest(".form-group").find(".error").text("");
			if ($(v).val()) {
				if (!selectedObj.includes($(v).val())) {
					selectedObj.push($(v).val());
				} else {
					$(v).closest(".form-group").find(".error").text("Duplicate found!");
					duplicateCount++;
				}
			}
		}).promise().done(function() {
			callback();
		});
	}

	function imageUploadValidation(callback) {
		var emptyCount = 1;
		var selectedObj = {};
		$('.imageElement').each(function(i, v) {
			if (!$(v).val()) {
				emptyCount++;
			} else {
				var parentElement = $(v).closest(".image-preview-section").find(".select2.imageUpload");
				var selectBoxText = parentElement.find('option:selected').text();
				var selectBoxVal = parentElement.find('option:selected').val();
				selectedObj[selectBoxVal] = selectBoxText;
			}
		}).promise().done(function() {
			console.log(emptyCount);
			if (emptyCount = 1) {
				callback();
			} else {
				var errorMsg = "Upload below images <br> ";
				var missedUpload = [];
				var errorCount = 1;
				Object.keys(uploadObject).forEach(function(key) {
					if (!selectedObj.hasOwnProperty(key)) {
						errorMsg += "<span> "+errorCount+". "+uploadObject[key]+"</span> </br>";
						errorCount++;
					}
				});
				$(".uploadImageErrorMsg").html(errorMsg);
			}
		});
	}
	$("#validator_image_upload_form").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        var $this = $(e.currentTarget);
        console.log("return here");
        imageUploadValidation(function() {
        	console.log("return heres");
			imageUploadInit(function(cb) {
				console.log(cb);
			});
		});
    });

	function imageUploadInit(callback) {
		$('.image-preview:visible').each(function(i, v) {
			formData = new FormData();
			var $fileElem = $(v).closest(".image-preview-section");
			formData.append("slug", $fileElem.find(".select2.imageUpload").val());
			formData.append("file", uploadedImage[i]);
			var fileName = $fileElem.find(".imageElement").data("imagename");
			formData.append("originalFilename", fileName);
			$.ajax({
				url: '/ajax/imageUpload',
				method: "POST",
				data: formData,
				contentType: false,
				processData: false,
				success: response => {
					if (typeof cb === "function")
						callback(response);
				},
				error: err => {
					if (typeof cb === "function")
						callback({ status: "error" });  
				},
			});
		});
	}

	$(document).on("change", "input.upload-input", function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var $this = $(e.currentTarget);
		var filelength = this.files.length;

		ImagePreviewSet($this, filelength, this.files, function() {
			imageUploadValidation(function() {
				console.log("return here");
				// imageUpload();
			});
		});
	});

	function ImagePreviewSet (emptyObjElem, filelength, files, callback) {
		var $this = $(emptyObjElem);
		if ($this.val()) {
            for (var i = 0; i < filelength; i++) {
            	var emptyObjElem = $('input.imageElement[value=""]').first();
            	ImagePreview(emptyObjElem, files[i], function() {
            		console.log("object updated");
            	})
            }
		}
		callback();
	}

	function ImagePreview (emptyObjElem, fileObj, callback) {
    	var parentElem = emptyObjElem.closest(".image-preview-section");
    	parentElem.find(".image_name").text(fileObj.name);
    	uploadedImage.push(fileObj);
    	console.log("uploadedImage");
    	console.log(uploadedImage);
       	parentElem.find(".image-preview").removeClass("hide");
        parentElem.find(".image-display-hint").addClass("hide").removeClass("image-display-hint");
        parentElem.removeClass("hide");
    	emptyObjElem.val(fileObj);
    	emptyObjElem.data("imagename", fileObj.name);
    	ImageSetPreview(parentElem, fileObj, function() {
    		callback();
    	})
	}

	function ImageSetPreview (parentElem, fileObj, callback) {
		var reader = new FileReader();
        reader.onload = function(event) {
        	parentElem.find(".image-preview").attr('src', event.target.result);
        }
        reader.readAsDataURL(fileObj);
        callback();
	}

	$("#validator_general_input_form").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        var $this = $(e.currentTarget);
        if ($this.valid()) {
			$.ajax({
				url: '/ajax/testdrive',
				type: 'post',
				dataType: 'application/json',
				data: $("#js_lead_creation_form").serialize(),
				success: function(response) {
					alert(response);
				}
			});
		}
    });
    
	$("#validator_test_drive_form").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        var $this = $(e.currentTarget);
        if ($this.valid()) {
			$.ajax({
				url: '/ajax/testdrive',
				type: 'post',
				dataType: 'application/json',
				data: $("#js_lead_creation_form").serialize(),
				success: function(response) {
					alert(response);
				}
			});
		}
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
				success: function(response) {
					alert(response);
				}
			});
		}
    });

	$(".js_lead_edit").click(function(e) {
        //prevent Default functionality
        e.preventDefault();
        var $this = $(e.currentTarget);
		$.ajax({
			url: $this.attr("href"),
			type: 'get',
			data: {},
			success: function(response) {
				var $modelPopup = $(`.lead_edit_mdl_popup .modal-body`);
				$modelPopup.html(response);
				$(`.lead_edit_mdl_popup`).find(".select2").select2();
				$(".js-monthyearmask").datepicker({
					format: "mm-yyyy",
					viewMode: "months", 
					minViewMode: "months"
				})
				$(".js-datemonthyearmask").datepicker({ format: "dd-mm-yyyy" })
				$('.js-monthyearmask').inputmask('99/9999', { 'placeholder': 'MM/YYYY' })
				$('.js-datemonthyearmask').inputmask('99/99/9999', { 'placeholder': 'DD/MM/YYYY' })

				$(`.lead_edit_mdl_popup`).modal('show');
			}
		});
    });
   
	/*$(document).on("change", ".rating-checkbox-group input[type=radio]", function(e) {
		e.preventDefault();
		if ($(this).prop('checked')==true){
			alert($(this).val());
		}
	});*/
	$('#lightgallery').lightGallery({
		download: false,
		share: false,
		actualSize: false,
		autoplayControls: false,
	});

	function showLoading(message) {
		$(".otograde-loading").find(".otograde-loading-text").text(message);
		$(".otograde-loading").removeClass("hide");
	}

	function hideLoading(milliseconds) {
		setTimeout(() => {
			$(".otograde-loading").addClass("hide");	
		}, milliSeconds);
	}
};

const initSelect2 = () => {
	$('.select2').select2();
};

initAjax();
initSelect2();
intialize();