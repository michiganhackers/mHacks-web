$(document).ready(function(){ 

	$(".email").change(function(event){
		if($(this).val().indexOf("@") == -1 || $(this).val().indexOf(".edu") == -1) {
			$(this).tooltip({title:"school email required (.edu)", placement:"right",trigger:"manual"}).tooltip('show');
			$("#signup button").hide();
		} else { 
			$(this).tooltip('hide');
			$("#signup button").show();

		}
	})
	$(".name").change(function(event) {
		$("#signup button").show();
	})
	$("#signup").submit(function(event){
		event.preventDefault();

		$.post('/signup', $(this).serialize(), function(data) {
			$('#signup').html(data);
		});

	});

	$(".navlink").click(function(e){
		e.preventDefault();
		$(".tab").hide();
		$($(this).attr("href")).show();
	});
});