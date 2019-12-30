$('#imageUploadForm').on('submit',(function(e) {
	e.preventDefault();
	var formData = new FormData(this);

	$.ajax({
		type:'POST',
		url: $(this).attr('action'),
		data:formData,
		cache:false,
		contentType: false,
		processData: false,
		success:function(data){
			console.log("success");
			console.log(data);
		},
		error: function(data){
			console.log("error");
			console.log(data);
		}
	});
}));