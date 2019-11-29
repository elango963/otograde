$(function () {
	//Initialize Select2 Elements
	$('.select2').select2()
	
	//Initialize Select2 Elements
	$('.select2bs4').select2({
		theme: 'bootstrap4'
	})
	$(".datepicker").datepicker({
		format: "mm-yyyy",
		viewMode: "months", 
		minViewMode: "months"
    })
    $('.js-monthyearmask').inputmask('99/9999', { 'placeholder': 'MM/YYYY' })
})