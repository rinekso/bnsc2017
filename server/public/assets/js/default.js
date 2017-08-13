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
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}
function sendScore(score,name,id,game)
{
    $.ajax({
        url : url+'send/score',
        data : {
            id_user : id,
            name : name,
            score : score,
            game : game
        },
        type : 'GET',
        success : function(data){
            if(data)
                alert('score saved')
            updateLeaderBoard(game)
        }
    })
}
function updateLeaderBoard(game)
{
    $.ajax({
        url : url+'leaderboard/'+game,
        type : 'GET',
        success : function(data){
            $(".leader tbody").empty()
			var i = 1
			data.forEach(function(e){
				$(".leader tbody").append(
					'<tr>'+
						'<td>'+(i++)+'</td>'+
						'<td>'+e.name+'</td>'+
						'<td>'+e.score+'</td>'+
					'</tr>'
				)
			})
        }
    })
}
