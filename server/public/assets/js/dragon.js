var dragonX = 0,
dragonY = 0
$(document).ready(function(){
  // first animation dragon
  var scroll = $(window).scrollTop()
  if(scroll >= 0)
  {
    $("#dragon").addClass("active");
  }
  setTimeout("bannerInteractive()",1000)
  function animate() {
    player.anim.update()
    player.anim.draw(0, 0)
  }

  // define variables
  var canvas = document.getElementById('dragon')
  var ctx = canvas.getContext('2d')
  var player = {}

    // setup the player
    player.width  = 256
    player.height = 256
    player.speed  = 6
    player.anim   = new Animation('assets/img/dragon2.png',player.width,player.height, 0, 11)
    setInterval(animate,80)

  function Animation(path, frameWidth, frameHeight, startFrame, endFrame) {

    var animationSequence = []  // array holding the order of the animation
    var currentFrame = 0        // the current frame to draw
    var counter = 0             // keep track of frame rate

    // start and end range for frames
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
      animationSequence.push(frameNumber)

    /**
     * Update the animation
     */
    this.update = function() {
        currentFrame = (currentFrame + 1) % animationSequence.length
    }

    var self = this
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.draw = function(x, y) {
    var image = new Image()
    var frameWidth = frameWidth
    var frameHeight = frameHeight
    // calculate the number of frames in a row after the image loads
    image.src = path
    image.onload = function() {
      var framesPerRow = Math.floor(this.width / self.frameWidth)
      // get the row and col of the frame
      var row = Math.floor(animationSequence[currentFrame] / framesPerRow)
      var col = Math.floor(animationSequence[currentFrame] % framesPerRow)
      ctx.clearRect(0,0,self.frameWidth,self.frameHeight)
      ctx.drawImage(
      image,
      col * self.frameWidth, row * self.frameHeight,
      self.frameWidth, self.frameHeight,
      x, y,
      self.frameWidth, self.frameHeight)
      }
    }
  }
})
function bannerScroll(){
  $(".dragon").addClass("active")
}
function bannerInteractive()
{
  $("body").on("mousemove",function(){
    if($("#dragon").hasClass('active')){
      var dragon = document.getElementById("dragon"),
      style = window.getComputedStyle(dragon, null),
      dragX = style.getPropertyValue('margin-left'),
      dragY = style.getPropertyValue('margin-top'),
      // remove string "px"
      dragX = Number(dragX.substring(0, dragX.length-2))
      dragY = Number(dragY.substring(0, dragY.length-2))
      dragonX = dragX
      dragonY = dragY
      $("#dragon").removeClass('active')
    }
    dragX = dragonX
    dragY = dragonY
    // define variable
    var bannerHeight = $("#banner").height(),
    e = window.event,
    posX = e.clientX,
    posY = e.clientY,
    centerX = $(window).width()/2,
    centerY = bannerHeight/2
    if(posY <= bannerHeight)
    {
      var resultX = dragX+((posX-centerX)/15),
      resultY = dragY+((posY-centerY)/15)
      $("#dragon").css("margin-left",resultX+"px").css("margin-top",resultY+"px")
    }
  })
}
