//GLOBAL VARIABLES

// Establish screen
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.font = 'bold 56px Comic Sans MS';
// ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.lineWidth = 2;
// ctx.strokeStyle = 'black';

// Load sprites
const sprites = document.getElementById('sprites');

// Custom function for writing a stroked text
function drawText(text, x, y) {
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

// Custom function for drawing a tint on the screen
function drawTint(x, y, w, h) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(x, y, w, h);
}

// Variables
let speed = 2;
let score = 0; // Will hold the global score
let pressed = false; // Flag variable, determines if a key is pressed
let isPaused = true; // Flag variable, determines if the game is paused or unpaused
let isGameOver = false; // Flag variable, determines if the game is over or not

// Objects
const player = new Bird(32, 240, 80, 70);
const pipeTop = new Pipe(360, 0, 80, 300, 2);
const pipeBottom = new Pipe(360, 480, 80, 300, 2);
const background1 = new Background(0, 0, 360, 640, 2);
const background2 = new Background(360, 0, 360, 640, 2);

//Keyboard Controls
document.addEventListener('keydown', (e) => {
  // e.preventDefault();
  switch (e.keyCode) {
    case 32: //space bar
      if (pressed === false) {
        player.moveUp(speed);
        pressed = true;
      }
      break;
    case 13: //enter button (start new game/unpause)
      if (isGameOver) {
        window.location.reload();
      }

      if (isPaused) {
        isPaused = false;
      }
      break;
    case 27: //esc button (pause)
      if (!isPaused && !isGameOver) {
        isPaused = true;
      }
      break;
  }
}, false);

document.addEventListener('keyup', (e) => {
  // e.preventDefault();
  pressed = false;
}, false);

//Main Game Loop
function gameLoop() {
  if (!isPaused && !isGameOver) {
    player.update();
    pipeTop.update();
    pipeBottom.update();
    background1.update();
    background2.update();
  }

  initializeGame();

  if (isPaused) {
    drawTint(0, 0, 360, 640);
    drawText('Hit "Enter"', 180, 300);
    drawText('to play!', 180, 380);
    if (score > 0) {
      drawText(score, 180, 52);
    }
  } else if (isGameOver) {
    drawTint(0, 0, 360, 640);
    drawText('Game Over', 180, 310);
    drawText('Score: ' + score, 180, 380);
  } else {
    //show score if game is in play
    drawTint(0, 0, 360, 64);
    drawText(score, 180, 52);
  }

  window.requestAnimationFrame(gameLoop);
}

function initializeGame() {
  ctx.clearRect(0, 0, 360, 640);

  background1.draw();
  background2.draw();

  player.draw();
  pipeTop.draw();
  pipeBottom.draw();
}

//ENTRY POINT (starts the game)
gameLoop(); 