function Bird(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fallSpeed = 0;
  this.ySpeed = 0;

  // needed to make sure the player is not scoring many times at once
  // this.scored = false;
  this.canScore = false;
  this.frame = 0; // frame is 1 or 0 (two sprite frames for bird - needed for sprite animation)
}

// Methods of the object
Bird.prototype.draw = function () {
  // The image will be cropped from y = 80 and y = 150 giving us a nice two frame animation
  ctx.drawImage(sprites, 360, 81 + (this.frame * 70), 80, 70, this.x, this.y, this.width, this.height);
};

// Update method: handles logic and objects physics
Bird.prototype.update = function () {
  // Handle the gravity
  this.fallSpeed += 0.1; // This speed grows every time this function is called
  this.y += this.fallSpeed + this.ySpeed; // Gravity effect is achieved!

  // Check if the player dies first
  // Basic AABB Collision
  const obstacles = [pipe1, pipe2];

  obstacles.forEach(pipe => {
    if (pipe.isTop) {
      if (this.x + this.width >= pipe.x && this.x <= pipe.x + pipe.width) {
        if (this.y <= pipe.height) {
          console.log("hit top pipe");
          isGameOver = true;
        }
      }
    } else {
      if (this.x + this.width >= pipe.x && this.x <= pipe.x + pipe.width) {
        if (this.y + this.height >= pipe.y) {
          console.log('hit bottom pipe');
          isGameOver = true;
        }
      }
    }
  });

  // Die when hit the ground 
  if (this.y >= 600 || this.y < 0) {
    isGameOver = true;
  }

  // Player score increases based on distance traveled
  if (distanceTraveled > 100) {
    distanceTraveled = 0;
    score++;
  }

  // Handle the animation based on going up or down
  if (this.fallSpeed <= 1) {
    this.frame = 1;
  } else {
    this.frame = 0;
  }
};

// Reset the gravity and move the player up to give the jumping effect
Bird.prototype.moveUp = function (speed) {
  flyAudio.play();
  this.fallSpeed = 0;
  this.ySpeed = -speed;
};

Bird.prototype.moveDown = function (speed) {
  // this.fallSpeed = 0;
  diveAudio.play();
  this.ySpeed = speed + 1;
};
