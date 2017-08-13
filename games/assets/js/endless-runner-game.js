var dragonX = 0,
dragonY = 0,
app = {},
background = {}
app.tick = app.timeplay = app.score = 0
// define variables
var canvas = document.getElementById('endless-runner-game')
var ctx = canvas.getContext('2d')
var player = {},
canvas_w = $("#endless-runner-game").width(),
canvas_h = $("#endless-runner-game").height()
$(document).ready(function(){
  // setup the player
  player.width  = 256
  player.height = 256
  player.currentX = 0
  player.currentY = 500-180 
  player.anim   = new Animation('assets/img/dragon2.png',player.width,player.height, 0, 11)
  // define path of background
  background.bg_1 = ['assets/img/endlessrunner/background/bg_back_A.png','assets/img/endlessrunner/background/bg_back_B.png']
  background.bg_2 = ['assets/img/endlessrunner/background/bg_middle_A.png','assets/img/endlessrunner/background/bg_middle_B.png','assets/img/endlessrunner/background/bg_middle_C.png']
  background.bg_3 = ['assets/img/endlessrunner/background/bg_front_ground_A.png','assets/img/endlessrunner/background/bg_front_ground_B.png','assets/img/endlessrunner/background/bg_front_ground_C.png']
  background.bg_4 = ['assets/img/endlessrunner/background/bg_superfront_A.png','assets/img/endlessrunner/background/bg_superfront_B.png','assets/img/endlessrunner/background/bg_superfront_C.png']
  background.position = 0
  background.speed = 20
  background.anim = new BackgroundMove()
  $("#play").click(function(){
    let play = $(this).attr('data-play')
    if(play){
      startGame()
      $(this).hide()
    }

  })
})
function animate() {
  player.anim.update()
  player.anim.draw(player.currentX, player.currentY)
}
function backgroundLoop(){
  app.tick++
  if(app.tick%200 == 0)
  {
    app.tick = 0
    app.timeplay++
  }
  background.anim.update()
  background.anim.draw()
}
function startGame(){
  app.background = setInterval(backgroundLoop,50)
  // app.dragon_flying = setInterval(animate,80)
}
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
    ctx.clearRect(x,y,self.frameWidth,self.frameHeight)
    ctx.drawImage(
    image,
    col * self.frameWidth, row * self.frameHeight,
    self.frameWidth, self.frameHeight,
    x, y,
    180, 180)
    }
  }
}
function BackgroundMove() {

  var self = this
  /**
   * Update the animation
   */
  this.update = function() {
    self.speed = 50/1000*background.speed
    background.position += self.speed
  }

  this.draw = function() {
    // console.log('asd')
    var image = new Image()
    // calculate the number of frames in a row after the image loads
    if(typeof background.back_1 == 'undefined' || background.back_1 == ''){
      background.back_1 = Math.floor(Math.random() * background.bg_1.length)
    }
    image.src = background.bg_1[background.back_1]
    image.onload = function() {
      var img_height = this.height,
      img_width = this.width,
      rasio = canvas_h/img_height,
      img_height_canvas = canvas_h,
      img_width_canvas = rasio*img_width
      ctx.clearRect(0,0,canvas_w,canvas_h)
      var frameWidth = img_width
      if(background.position > 0){
        frameWidth = canvas_w-background.position
      }
      img_width_canvas = frameWidth
      console.log(canvas_w+"/"+frameWidth*rasio)
      ctx.drawImage(
      image,
      background.position*rasio,0,
      frameWidth*rasio, img_height,
      0, 0,
      img_width_canvas, img_height_canvas)
    }
  }
}
