(function () {
  // define variables
  var canvas = document.getElementById('endless-runner-game')
  var ctx = canvas.getContext('2d')
  var player = {}
  var ground = []
  var spike = {},
  stop
  var platformWidth = 32
  var platformHeight = canvas.height - platformWidth * 4
  player.currentY = 0

  /**
   * Asset pre-loader object. Loads all images
   */
  var assetLoader = (function() {
    // images dictionary
    this.imgs        = {
      'back_1'        : 'assets/img/endlessrunner/background/bg_back_A.png',
      'backdrop'      : 'assets/img/endlessrunner/background/bg_middle_A.png',
      'backdrop2'     : 'assets/img/endlessrunner/background/bg_front_ground_A.png',
      'backdrop3'     : 'assets/img/endlessrunner/background/bg_superfront_A.png',
      'avatar_normal' : 'assets/img/dragon2.png',
      'spike_0'       : 'assets/img/endlessrunner/obstacle/obs_btm_A.png',
      'spike_1'       : 'assets/img/endlessrunner/obstacle/obs_btm_B.png',
      'spike_2'       : 'assets/img/endlessrunner/obstacle/obs_top_A.png',
      'spike_3'       : 'assets/img/endlessrunner/obstacle/obs_top_B.png',
    }

    var assetsLoaded = 0;                                // how many assets have been loaded
    var numImgs      = Object.keys(this.imgs).length;    // total number of image assets
    this.totalAssest = numImgs;                          // total number of assets

    /**
     * Ensure all assets are loaded before using them
     * @param {number} dic  - Dictionary name ('imgs', 'sounds', 'fonts')
     * @param {number} name - Asset name in the dictionary
     */
    function assetLoaded(dic, name) {
      // don't count assets that have already loaded
      if (this[dic][name].status !== 'loading') {
        return
      }

      this[dic][name].status = 'loaded'
      assetsLoaded++

      // finished callback
      if (assetsLoaded === this.totalAssest && typeof this.finished === 'function') {
        this.finished()
      }
    }

    /**
     * Create assets, set callback for asset loading, set asset source
     */
    this.downloadAll = function() {
      var _this = this
      var src

      // load images
      for (var img in this.imgs) {
        if (this.imgs.hasOwnProperty(img)) {
          src = this.imgs[img];

          // create a closure for event binding
          (function(_this, img) {
            _this.imgs[img] = new Image()
            _this.imgs[img].status = 'loading'
            _this.imgs[img].name = img
            _this.imgs[img].onload = function() { assetLoaded.call(_this, 'imgs', img) }
            _this.imgs[img].src = src
          })(_this, img)
        }
      }
    }

    return {
      imgs: this.imgs,
      totalAssest: this.totalAssest,
      downloadAll: this.downloadAll
    }
  })()

  assetLoader.finished = function() {
    $("#game-over h1").hide()
    $("#restart").click(function(e){
      $(this).hide()
      stop = false
      startGame()
    })
  }

  /**
   * Creates a Spritesheet
   * @param {string} - Path to the image.
   * @param {number} - Width (in px) of each frame.
   * @param {number} - Height (in px) of each frame.
   */
  function SpriteSheet(path, frameWidth, frameHeight) {
    this.image = new Image()
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    // calculate the number of frames in a row after the image loads
    var self = this
    this.image.onload = function() {
      self.framesPerRow = Math.floor(self.image.width / self.frameWidth)
    }

    this.image.src = path
  }

  /**
   * Creates an animation from a spritesheet.
   * @param {SpriteSheet} - The spritesheet used to create the animation.
   * @param {number}      - Number of frames to wait for before transitioning the animation.
   * @param {array}       - Range or sequence of frame numbers for the animation.
   * @param {boolean}     - Repeat the animation once completed.
   */
  function Animation(spritesheet, frameSpeed, startFrame, endFrame) {

    var animationSequence = [];  // array holding the order of the animation
    var currentFrame = 0;        // the current frame to draw
    var counter = 0;             // keep track of frame rate

    // start and end range for frames
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
      animationSequence.push(frameNumber)

    /**
     * Update the animation
     */
    this.update = function() {

      // update to the next frame if it is time
      if (counter == (frameSpeed - 1))
        currentFrame = (currentFrame + 1) % animationSequence.length

      // update the counter
      counter = (counter + 1) % frameSpeed
    }

    /**
     * Draw the current frame
     * @param {integer} x - X position to draw
     * @param {integer} y - Y position to draw
     */
    this.draw = function(x, y) {
      // get the row and col of the frame
      var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow)
      var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow)

      ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight)
    }
  }

  /**
   * Create a parallax background
   */
  var background = (function() {
    var sky   = {},
    backdrop = {},
    backdrop2 = {},
    backdrop3 = {},
    obstacle = {}

    /**
     * Draw the backgrounds to the screen at different speeds
     */
    this.draw = function() {
      // ctx.drawImage(assetLoader.imgs.bg, 0, 0)
      ctx.clearRect(0,0,$("#endless-runner-game").width(),$("#endless-runner-game").height())

      // Pan background
      sky.x -= sky.speed
      backdrop.x -= backdrop.speed
      backdrop2.x -= backdrop2.speed
      backdrop3.x -= backdrop3.speed
      spike.x -= obstacle.speed

      // draw images side by side to loop
      ctx.drawImage(assetLoader.imgs.back_1, sky.x, sky.y)
      ctx.drawImage(assetLoader.imgs.back_1, sky.x + canvas.width, sky.y)

      ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x, backdrop.y)
      ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x + canvas.width, backdrop.y)

      ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x, backdrop2.y)
      ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x + canvas.width, backdrop2.y)

      ctx.drawImage(assetLoader.imgs.backdrop3, backdrop3.x, backdrop3.y)
      ctx.drawImage(assetLoader.imgs.backdrop3, backdrop3.x + canvas.width, backdrop3.y)

      if(typeof spike.path != 'undefined'){
        if(spike.type == 0){
          obstacle.y = 250
          obstacle.x = 66
        }else if(spike.type == 1){
          obstacle.y = 275
          obstacle.x = 33
        }else if(spike.type == 2){
          obstacle.y = 0
          obstacle.x = 66
        }else{
          obstacle.y = 0
          obstacle.x = 33          
        }
        ctx.drawImage(spike.path, spike.x, obstacle.y)
      }

      // If the image scrolled off the screen, reset
      if (sky.x + assetLoader.imgs.back_1.width <= 0)
        sky.x = 0
      if (backdrop.x + assetLoader.imgs.backdrop.width <= 0)
        backdrop.x = 0
      if (backdrop2.x + assetLoader.imgs.backdrop2.width <= 0)
        backdrop2.x = 0
      if (backdrop3.x + assetLoader.imgs.backdrop3.width <= 0)
        backdrop3.x = 0
      
      // if dragon step spike
      var player_top = player.currentY+50,
      player_bottom = player.currentY+230,
      bottom = false,
      top = false
      if(spike.x < 200 && spike.x > 50){
        if(player_top > obstacle.y && player_top  < obstacle.y+obstacle.x)
          top = true
        if(player_bottom < obstacle.y+obstacle.x && player_bottom > obstacle.y)
          bottom = true
        if(!bottom && !top){
          if(player_top < obstacle.y && player_bottom > obstacle.y+obstacle.x)
            top = true
        }
        if(bottom || top)
        {
          if(!player.die){
            player.life--
            player.die = true
            if(player.life < 0)
              gameover()            
          }
        }else{
          player.die = false
        }
      }else{
        player.die = false
      }

    }

    /**
     * Reset background to zero
     */
    this.reset = function()  {
      sky.x = 0
      sky.y = 0
      sky.speed = 0.2

      backdrop.x = 0
      backdrop.y = 0
      backdrop.speed = 0.4

      backdrop2.x = 0
      backdrop2.y = 0
      backdrop2.speed = 5

      backdrop3.x = 0
      backdrop3.y = 0
      backdrop3.speed = 0.8

      obstacle.x = 0
      obstacle.y = 0
      obstacle.speed = 5
    }

    return {
      draw: this.draw,
      reset: this.reset
    }
  })()

  /**
   * Game loop
   */
  function animate() {
    if(!stop){
      requestAnimFrame( animate )

      background.draw()

      if (ground[0].x <= -platformWidth) {
        ground.shift()
        ground.push({'x': ground[ground.length-1].x + platformWidth, 'y': platformHeight})
      }

      player.anim.update()
      player.anim.draw(0, player.currentY)

      // player score
      scoreDisplay()
      // player life
      lifeDisplay()
    }
  }

  /**
   * Request Animation Polyfill
   */
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback, element){
              window.setTimeout(callback, 1000 / 60)
            }
  })()

  function spikeSet() {
    var type = Math.floor(Math.random() * 4)
    spike.type = type
    spike.path = assetLoader.imgs['spike_'+type]
    spike.x = canvas.width
    // console.log(spike.path)
  }
  function scoreDisplay()
  {
    ctx.font = "24px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText("Score : "+player.score,150,50)
  }
  function lifeDisplay()
  {
    ctx.font = "24px Arial"
    ctx.fontColor = "#fff"
    ctx.fillText("Life : "+player.life,10,50)
  }
  function gameover()
  {
    stop = true
    $("#game-over #restart").show()
    $("#game-over h1").show().children('span').text(player.score)
    $("#restart").text('Restart')
  }
  $(window).on('keydown',function(e){
    e.preventDefault()
    if(e.keyCode == 38){
      // up
      if(player.currentY > -100)
        player.currentY -= 15
    }else if(e.keyCode == 40){
      // down
      console.log(canvas.height)
      if(player.currentY < canvas.height-320)
        player.currentY += 15
    }
    return false
  })

  /**
   * Start the game - reset all variables and entities, spawn platforms and water.
   */
  function startGame() {
    // setup the player
    player.life = 3
    player.score = 0
    player.die = false
    player.width  = 256
    player.height = 256
    player.speed  = 6
    player.sheet  = new SpriteSheet('assets/img/dragon2.png', player.width, player.height)
    player.anim   = new Animation(player.sheet, 4, 0, 11)

    // create the ground tiles
    for (i = 0, length = Math.floor(canvas.width / platformWidth) + 2; i < length; i++) {
      ground[i] = {'x': i * platformWidth, 'y': platformHeight}
    }

    background.reset()

    animate()

    player.time = 0

    clearInterval(player.spike)
    player.spike = setInterval(function(){
      player.time++
      player.score++
      // spike spawn evry 3 second
      if(player.time%3 == 0){
        spikeSet()
      }
    },1000)
  }

  assetLoader.downloadAll()
})();