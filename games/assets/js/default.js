$(document).ready(function(){
	$("nav").css("pointer-events","none")
	$(".head-1").css("pointer-events","auto")
	$(".head-2").css("pointer-events","auto")
    // Menu first action
	$("#menu-toggle").click(function(){
		var toggle = $(this).attr('data-toggle')
		if(toggle == 0)
		{
			$(this).attr('data-toggle',1)
			$(".head-2 ul").addClass("active")
		}else{
			$(this).attr('data-toggle',0)
			$(".head-2 ul").removeClass("active")
		}
	})
	// toggle search
	$(".user.search").click(function(){
		toggleSearch(1);
	});
	$(".search-contain button").click(function(){
		toggleSearch(0);
	})
})
function toggleSearch (param){
	if(param == 1)
	{
		$(".user-contain").addClass('active')
		$(".search-contain").addClass('active')	
	}else{
		$(".user-contain").removeClass('active')
		$(".search-contain").removeClass('active')	
	}
}
