function Background(x, y, width, height, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
}

Background.prototype.draw = function () {
  ctx.drawImage(sprites, 0, 0, 360, 640, this.x, this.y, this.width, this.height);
};

Background.prototype.update = function () {
  this.x -= this.speed;

  if (this.x + this.width <= 0) {
    this.x = 360;
  }
};