//GLOBAL VARIABLES

// Establish screen
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.font = 'bold 56px Comic Sans MS';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';

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