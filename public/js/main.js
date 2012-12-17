$(document).ready(function(){ 

	$(".email").change(function(event){
		
		if($(this).val().indexOf("@") == -1 || $(this).val().indexOf(".") == -1){
			$(this).tooltip({title:"invalid email", placement:"top",trigger:"manual"}).tooltip('show');
			$(".signup button").attr("disabled","true");
		} else {
			$(".signup button").removeAttr("disabled");
			$(this).tooltip('hide');
		}
		
	})
	$(".signup").submit(function(event){
		event.preventDefault();

		$.post('/signup', $(this).serialize(), function(data) {
			$('.signup').html(data);
		});

	});

	$(".navlink").click(function(e){
		e.preventDefault();
		$(".tab").hide();
		$($(this).attr("href")).show();
	});

	$(".question").click(function() {
		$(".ans").hide();
		$(this).next(".ans").show();
	});


	// animate ticker
	tick();

});

function tick() {
	$('.ticker li:first').animate( {"marginLeft": "-=220px"}, 6000, 'linear', function() {
		$(this).detach().appendTo('.ticker').removeAttr('style');	
		tick();
	});
};

