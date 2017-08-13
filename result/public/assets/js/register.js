$(document).ready(function(){
	init()
	$("#label-picture").click(function(e){
		e.preventDefault()
		file()
	})
	$(".part").click(function(){
		if($(this).hasClass('login')){
			$(this).addClass('active')
			$('.register').removeClass('active')
		}else if($(this).hasClass('register'))
		{
			$(this).addClass('active')
			$('.login').removeClass('active')
		}
	})
})
$(window).resize(function(){
	init()
})
function init(){
	if($(window).width() > 320){
		var regis_height = $(".register.active.part").height()
		$(".login").css('height',regis_height+'px')
	}else{
		$(".login").removeAttr('style')
	}
}
function file(){
	$("#label-picture").addClass('hide')
	$("#picture").removeClass('hide').trigger("click")
}
