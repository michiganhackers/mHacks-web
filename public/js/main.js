$(document).ready(function(){ 

	// fade in content

	animate($("section"), "fadeInUp");
	//animate($(".signup"), "fadeInLeftBig");
	//animate($(".foot"), "fadeInUpBig");

	function check_email(event){

		// TODO, make this take .edu only?
		var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/;
		var edu_reg = /.edu/;

		var value = $(".email").val();
		window.edu_email = edu_reg.test(value);
		window.valid_email = email_reg.test(value);

		if(!valid_email){
			$(".signup button").attr("disabled","true");
		} else {
			if($(".name").val()) {
				$(".signup button").removeAttr("disabled");	
			} 
			if(edu_email) {
				$(".email").tooltip('destroy');
				$(".school").attr("type","hidden");
			}
		}
	}

	$(".email")
		.on("keyup", check_email)
		.on("blur", check_email)
		.change(function() {
			check_email();
			if($(this).val() == "") return;
			
			if(!valid_email) {
				$(".email").tooltip('destroy');
				$(this).tooltip({
					title: 		"Invalid Email", 
					placement: 	"top",
					trigger: 	"manual"
				}).tooltip('show');
			} else if (!edu_email) {
				$(".email").tooltip('destroy');

				$(".school").attr("type","text");
				$(this).tooltip({
					title: 		"No .edu email? What school then?", 
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

	load_video();
});

function load_video() {
	if( window.innerWidth < 800) return;
	$(".video").html('<iframe width="100%" height="100%" src="//www.youtube.com/embed/rcatzGEG3ro?autoplay=1&loop=1&controls=0&showinfo=0&autohide=1&wmode=opaque" frameborder="0"></iframe> ');
}

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
