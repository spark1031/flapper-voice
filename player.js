function Bird(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fallSpeed = 0;
  this.ySpeed = 0;

  this.scored = false;
  this.frame = 0; // frame is 1 or 0 (two sprite frames for bird - needed for sprite animation)
}

// Methods of the object
Bird.prototype.draw = function () {
  ctx.drawImage(birdPlayer, 0, (this.frame * 70), 80, 70, this.x, this.y, this.width, this.height);
};

// Update method: handles logic and objects physics
Bird.prototype.update = function () {
  // Handle the gravity
  if (gameControls != "keyboard") {
    this.fallSpeed += 0.001;
  } else {
    this.fallSpeed += 0.1; // This speed grows every time this function is called
  }
  this.y += this.fallSpeed + this.ySpeed; // Gravity effect is achieved!

  // Check if the player dies first
  // Basic AABB Collision
  const obstacles = [pipe1, pipe2];

  obstacles.forEach(pipe => {
    if (pipe.isTop) {
      if (this.x + this.width >= pipe.x && this.x <= pipe.x + pipe.width) {
        this.scored = false;
        if (this.y <= pipe.height) {
          console.log("hit top pipe");
          isGameOver = true;
        }
      } else if (this.x > (pipe.x + pipe.width)) {
        if (!this.scored) {
          this.scored = true;
          score++;
        }
      }
    } else {
      if (this.x + this.width >= pipe.x && this.x <= pipe.x + pipe.width) {
        this.scored = false;
        if (this.y + this.height >= pipe.y) {
          console.log('hit bottom pipe');
          isGameOver = true;
        }
      } else if (this.x > (pipe.x + pipe.width)) {
        if (!this.scored) {
          this.scored = true;
          score++;
        }
      }
    }
  });

  // Die when hit the ground 
  if (this.y >= 600 || this.y + this.height < 0) {
    isGameOver = true;
  }

  // Handle the animation based on going up or down
  if ((gameControls == "keyboard" && this.fallSpeed <= 1) || (gameControls != "keyboard" && this.fallSpeed <= 0.05)) {
    this.frame = 1;
  } else {
    this.frame = 0;
  }
};

// Reset the gravity and move the player up to give the jumping effect
Bird.prototype.moveUp = function (upSpeed) {
  flyAudio.play();
  this.fallSpeed = 0;
  this.ySpeed = -upSpeed;
};

Bird.prototype.moveDown = function (speed) {
  const downSpeed = speed * 0.2;
  diveAudio.play();
  // this.fallSpeed = 0;
  this.ySpeed = downSpeed;
};
