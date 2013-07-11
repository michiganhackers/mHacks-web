$(document).ready(function(){ 

	// fade in content

	animate($("section"), "fadeInUp");
	//animate($(".signup"), "fadeInLeftBig");
	//animate($(".foot"), "fadeInUpBig");

	function check_email(event){

		// TODO, make this take .edu only?
		var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/;
		
		window.valid_email = email_reg.test($(this).val())
		console.log(valid_email, $(this).val())
		if(!valid_email){
			$(".signup button").attr("disabled","true");
		} else {
			$(".signup button").removeAttr("disabled");
			$(this).tooltip('hide');
		}
	}

	$(".email")
		.on("keyup", check_email)
		.on("blur", check_email)
		.change(function() {
			check_email();
			if(!valid_email && $(this).val() != "") {
				$(this).tooltip({
					title: 		"invalid email", 
					placement: 	"top",
					trigger: 	"manual"
				}).tooltip('show');
			}
		});

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
	//tick();

});

function tick() {
	$('.ticker li:first').animate( {"marginLeft": "-=220px"}, 6000, 'linear', function() {
		$(this).detach().appendTo('.ticker').removeAttr('style');	
		tick();
	});
};

function animate($sel, name) {
	$sel.addClass("animated " + name);
	setTimeout(function(){
		$sel.removeClass(name);
	}, 1000);
}
