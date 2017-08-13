document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate'
    }
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] )
        render()
    }
    return false
}
$("#game-over h1").hide()
$("#restart").click(function(){
    $("#game-over h1").hide()
    $(this).hide()
    newGame()
    return false
})
