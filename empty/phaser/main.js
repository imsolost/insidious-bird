//create main state that contains game

var weapon;

var mainState = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the images and sounds

    // Load the bird sprite
    game.load.image('bird', 'assets/bird.png')

    //load pipes sprite
    game.load.image('pipe', 'assets/pipe.png')

    //load jump sound
    game.load.audio('jump', 'assets/jump.wav')

    game.load.image('bullet', 'assets/bullet.png')
  },

  create: function() {
    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.

    // Change the background color of the game to blue
   game.stage.backgroundColor = '#71c5cf';

   // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 000;

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                   Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    var upArrow = game.input.keyboard.addKey(
                   Phaser.Keyboard.UP);
    upArrow.onDown.add(this.teleportUp, this);

    var downArrow = game.input.keyboard.addKey(
                   Phaser.Keyboard.DOWN);
    downArrow.onDown.add(this.teleportDown, this);

    //create an empty group
    this.pipes = game.add.group()

    // add row of pipes every 1.5 seconds
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this)

    this.score = 0
    this.labelScore = game.add.text(20, 20, '0', { font: '30px Arial', fill: '#ffffff' })

    this.bird.anchor.setTo(-.2, .5)

    this.jumpSound = game.add.audio('jump')

    var weapon = this.add.weapon(10, 'bullet')
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = 600
    weapon.fireRate = 100
    weapon.trackSprite(this.bird, 0, 0, true)
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.W)
  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic

    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame()

    game.physics.arcade.overlap(
      this.bird, this.pipes, this.hitPipe, null, this)

    if (this.bird.angle < 20)
      this.bird.angle += 1

      if (fireButton.isDown)
    {
        this.weapon.fire();
    }

  },

  hitPipe: function() {
    // If the bird has already hit a pipe, do nothing
    // It means the bird is already falling off the screen
    if (this.bird.alive == false)
      return

    //set the alive property of the bird to false
    this.bird.alive = false

    //prevent new pipes from appearing
    game.time.events.remove(this.timer)

    //go through all the pupes and stop their movements
    this.pipes.forEach(function(p){
      p.body.velocity.x = 0
    }, this)
  },

  //make bird jump
  jump: function() {
    if (this.bird.alive == false)
      return

    //add a vertical velocity to the bird
    this.bird.body.velocity.y = -350

    // Create an animation on the bird
    //var animation = game.add.tween(this.bird)

    // Change the angle of the bird to -20° in 100 milliseconds
    //animation.to( { angle: -20}, 100 )

    //and start the animation
    //animation.start()

    game.add.tween(this.bird).to({angle: -20}, 100).start()

    this.jumpSound.play()
  },

  teleportUp: function() {
    if (this.bird.alive == false)
      return

    this.bird.y -= 100

    this.jumpSound.play()
  },

  teleportDown: function() {
    if (this.bird.alive == false)
      return

    this.bird.y += 100

    this.jumpSound.play()
  },

  fire: function() {
    if (this.bird.alive == false)
      return

    this.weapon.fire()
  },

  addOnePipe: function(x, y) {
      // Create a pipe at the position x and y
      var pipe = game.add.sprite(x, y, 'pipe');

      // Add the pipe to our previously created group
      this.pipes.add(pipe);

      // Enable physics on the pipe
      game.physics.arcade.enable(pipe);

      // Add velocity to the pipe to make it move left
      pipe.body.velocity.x = -200;

      // Automatically kill the pipe when it's no longer visible
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1 && i != hole + 2)
            this.addOnePipe(400, i * 60 + 10);

  this.score += 1
  this.labelScore.text = this.score
},

  //restart the game
  restartGame: function() {
    //start the 'main' state, which restarts the game
    game.state.start('main')
  }
}

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490)

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState)

// Start the state to actually start the game
game.state.start('main')
