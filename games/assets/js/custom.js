var app = {}
initDisplay()
$(window).resize(function(){
	initDisplay()
})
function initDisplay(){
		app.endless = $("#endless").offset(),
		app.endless_back = $("#endless .background").width()
		if($(window).width() <= 768)
		{
			let back_width = $("#endless .background").width()
			$("#endless .background").css({
				left : '-'+((back_width/2)-($(window).width()/2))+'px',
				top : (back_width/2)-($(window).width()/2)+'px'
			})
			$("#endless").css("height",back_width+"px")			
			$("#endless .text-1").css("top",((app.endless_back/5)-$("#endless .background").height())+"px")
			$("#endless .text-2").css("top",(app.endless_back*2/5)+"px")
			$("#endless .text-3").css("top",(app.endless_back*3/5)+"px")
		}else{
			$("#endless").removeAttr('style')
			$("#endless .background").removeAttr('style')
			// positioning text of endless preview
			$("#endless .text-1").css("left",(app.endless_back/4)+"px")
			$("#endless .text-2").css("left",(app.endless_back/2)+"px")
			$("#endless .text-3").css("left",(app.endless_back*3/4)+"px")
		}
}
$(document).ready(function(){
})
$(window).on("scroll",function(){
	var scroll = $(window).scrollTop(),
	tetris = $("#tetris-game").offset()
	// endless preview
	var trackfull = $("#endless .background").width()-$(window).width()
	if(scroll >= app.endless.top && scroll < (tetris.top-$(window).height()))
	{
		// responsive for desktop only
		if($(window).width() > 768)
		{
			var scfull = $("#endless").height()-$(window).height(),
			scnow = scroll-app.endless.top-(scfull/6)
			if(scroll < (tetris.top-$(window).height())-(scfull/6) && scroll > app.endless.top+(scfull/6)){
				scfull = scfull*4/6
				var tracknow = trackfull/scfull*scnow
				if(tracknow >= trackfull/3 && tracknow < trackfull*3/4){
					$("#dragon.run-mode").addClass('down')
				}else{
					$("#dragon.run-mode").removeClass('down')
				}

				$("#endless .text-1").css("left",((app.endless_back/4)-tracknow)+"px")
				$("#endless .text-2").css("left",((app.endless_back/2)-tracknow)+"px")
				$("#endless .text-3").css("left",((app.endless_back*3/4)-tracknow)+"px")
				$("#endless .background").css("margin-left","-"+(tracknow)+"px")
			}else if(scroll > (tetris.top-$(window).height())-(scfull/6)){
				$("#endless .background").css("margin-left","-"+trackfull+"px")
			}
		}
		if($(window).width() > 320){
			$(".space").addClass("active-endless")
			$("#endless").addClass("active")
			$("#dragon").addClass("run-mode")			
		}
	}else{
		$(".space").removeClass("active-endless")
		$("#endless").removeClass("active")
		$("#dragon").removeClass("run-mode")
	}
	if(scroll >= tetris.top-$(window).height()){
		$("#tetris-game").addClass('active')
		$("#tetris").addClass('game')
	}else{
		$("#tetris-game").removeClass('active')
		$("#tetris").removeClass('game')
	}
})
