function Pipe(image, x, isTopPipe, width, speed) {
  this.isTop = isTopPipe;
  if (isTopPipe) {
    this.y = 0;
    this.height = Math.random() * (400 - 50) + 50;
  } else {
    const positionY = Math.random() * (550 - 150) + 150;
    this.y = positionY;
    this.height = 600;
  }
  this.x = x;
  this.width = width;
  this.speed = speed;
  this.image = image;
}

Pipe.prototype.draw = function () {
  ctx.drawImage(this.image, 0, 0, 155, 155, this.x, this.y, this.width, this.height);
};

//pipe moves to left (@constant speed)
Pipe.prototype.update = function () {
  this.x -= this.speed;

  //if pipe is off the page, reset it's position
  if (this.x + this.width <= 0) {
    this.x = 1000;
    const pipeIsTop = [true, false];
    this.isTop = pipeIsTop[Math.floor(Math.random() * pipeIsTop.length)];

    if (this.isTop) {
      //top pipe reset
      this.y = 0;
      this.height = Math.random() * (400 - 50) + 50;
    } else {
      //bottom pipe reset
      this.y = Math.random() * (550 - 150) + 150;
      this.height = 600;
    }
  }
};

