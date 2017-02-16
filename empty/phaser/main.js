//create main state that contains game

var mainState = {
  preload: function() {
    // Load the sprites
    game.load.image('nyan', 'assets/NyanCat.png')
    game.load.image('bird', 'assets/bird.png')
    game.load.image('bullet', 'assets/bullet.png')
    game.load.image('pipe', 'assets/pipe.png')

    //load jump sound
    game.load.audio('jump', 'assets/jump.wav')

  },

  create: function() {
    // Change the background color of the game to blue
   game.stage.backgroundColor = '#71c5cf';

   // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the sprite at the position x=100 and y=245
    sprite = game.add.sprite(100, 245, 'nyan');
    sprite.scale.setTo(.2, .2)

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(sprite);

    // Add gravity to the bird to make it fall
    sprite.body.gravity.y = 1000;

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

    sprite.anchor.setTo(-.2, .5)

    this.jumpSound = game.add.audio('jump')

    weapon = game.add.weapon(10, 'bullet')
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = 600
    weapon.fireRate = 100
    weapon.trackSprite(sprite, 0, 0, true)

    var fireButton = game.input.keyboard.addKey(
                    Phaser.KeyCode.W)
    fireButton.onDown.add(this.fireWeapon, this)

  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (sprite.y < 0 || sprite.y > 490)
      this.restartGame()

    game.physics.arcade.overlap(
      sprite, this.pipes, this.hitPipe, null, this)

    game.physics.arcade.overlap(
      weapon.bullets, this.pipes, this.bulletHitPipe, null, this)

    if (sprite.angle < 20)
      sprite.angle += 1

    game.world.wrap(sprite, 16);

  },

  hitPipe: function() {
    // If the bird has already hit a pipe, do nothing
    // It means the bird is already falling off the screen
    if (sprite.alive == false)
      return

    //set the alive property of the bird to false
    sprite.alive = false

    //prevent new pipes from appearing
    game.time.events.remove(this.timer)

    //go through all the pipes and stop their movements
    this.pipes.forEach(function(p){
      p.body.velocity.x = 0
    }, this)
  },

  bulletHitPipe: function() {
    // If the bird has already hit a pipe, do nothing
    if (sprite.alive == false)
      return

      this.pipes.kill()
      weapon.bullets.kill()

  },

  jump: function() {
    if (sprite.alive == false)
      return

    //add a vertical velocity to the bird
    sprite.body.velocity.y = -350

    game.add.tween(sprite).to({angle: -20}, 100).start()

    this.jumpSound.play()
  },

  teleportUp: function() {
    if (sprite.alive == false)
      return

    sprite.y -= 100
    sprite.body.velocity.y = 0

    this.jumpSound.play()
  },

  teleportDown: function() {
    if (sprite.alive == false)
      return

    sprite.y += 100
    sprite.body.velocity.y = 0

    this.jumpSound.play()
  },

  fireWeapon: function() {
    if (sprite.alive == false)
      return

    weapon.fire()
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
