function Bird(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fallSpeed = 0;
  this.ySpeed = 0;

  // needed to make sure the player is not scoring many times at once
  this.scored = false;
  this.frame = 0; // frame is 1 or 0 (two sprite frames for bird - needed for sprite animation)
}

// Methods of the object
Bird.prototype.draw = function () {
  // The image will be cropped from y = 80 and y = 150 giving us a nice two frame animation
  ctx.drawImage(sprites, 360, 81 + (this.frame * 70), 80, 70, this.x, this.y, this.width, this.height);
}

// Update method: handles logic and objects physics
Bird.prototype.update = function () {
  // Handle the gravity
  this.fallSpeed += 0.1; // This speed grows every time this function is called
  this.y += this.fallSpeed + this.ySpeed; // Gravity effect is achieved!

  // Check if the player dies first

  // Basic AABB Collision
  // Check if the player touches a pipe on the x axis first
  if (this.x + this.width >= pipeTop.x && this.x <= pipeTop.x + pipeTop.width) {
    // Then check if it touches any of the pipes on the y axis
    if (this.y + this.height >= pipeBottom.y || this.y <= pipeTop.y + pipeTop.height) {
      isGameOver = true;
    } else {
      if (!this.scored) {
        score++;
        this.scored = true;
      }
    }
  }
  // Die when hit the ground 
  if (this.y >= 600) {
    isGameOver = true;
  }

  // Player can score again now that the pipe is reset
  if (pipeTop.x >= 360) {
    this.scored = false;
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
  this.fallSpeed = 0;
  this.ySpeed = -speed;
};
