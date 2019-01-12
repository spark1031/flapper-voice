function Pipe(x, y, width, height, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
}

Pipe.prototype.draw = function () {
  ctx.drawImage(sprites, 360, 0, 80, 80, this.x, this.y, this.width, this.height);
};

//pipe moves to left (@constant speed)
Pipe.prototype.update = function () {
  this.x -= this.speed;

  if (this.x + this.width <= 0) {
    this.x = 360;

    //if top pipe
    if (this.y <= 320) {
      this.y = -(Math.random() * (150 - 50) + 50);
    } else {
      this.y = 320 + (Math.random() * (150 - 50) + 50);
    }
  }
};
