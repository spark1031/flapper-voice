//GLOBAL VARIABLES

// Establish game screens
const splash = document.getElementById('splash-canvas');
const startButton = document.getElementById("start-button");
const directions = document.getElementById('direction-canvas');
const keyboardButton = document.getElementById('keyboard-button');
const voiceButton = document.getElementById('voice-button');
const scoreBar = document.getElementById("score-bar");
const pausePage = document.getElementById("pause-page");
const pauseSubtext = document.getElementById("pause-subtext");
const gameOverPage = document.getElementById("game-over-page");
const finalScoreBar = document.getElementById("final-score");
const playAgainButton = document.getElementById("button");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Load sprites
const birdPlayer = document.getElementById('player');
const background = document.getElementById('background');
const ice = document.getElementById('ice');

// Load audio
const flyAudio = new Audio();
flyAudio.src = "sounds/fly.mp3";
const diveAudio = new Audio();
diveAudio.src = "sounds/dive.mp3";
const themeAudio = new Audio('sounds/theme.mp3');
themeAudio.loop = true;

// Game Variables
let gameControls;
const voiceControls = new VoiceControl();
let level = 1;
let xSpeed;
let ySpeed;
let score = 0; // Will hold the global score
let pressed = false; // Flag variable, determines if a key is pressed
let isPaused = false; // Flag variable, determines if the game is paused or unpaused
let isGameOver = false; // Flag variable, determines if the game is over or not

// Game Objects
let player;
let pipe1;
let pipe2;
let background1;
let background2;

// Game Objects Setup
function setupGameObjects() {
  if (gameControls != "keyboard") {
    ySpeed = 0.5;
    xSpeed = 1;
    pauseSubtext.innerHTML = "say 'UNPAUSE' to unpause";
  } else {
    xSpeed = 2;
    ySpeed = 3;
    pauseSubtext.innerHTML = "hit enter to unpause";
  }
  player = new Bird(32, 240, 80, 70);
  pipe1 = new Pipe(ice, 900, true, 80, xSpeed);
  pipe2 = new Pipe(ice, 400, false, 80, xSpeed);
  background1 = new Background(0, 0, 1000, 640, xSpeed);
  background2 = new Background(1000, 0, 1000, 640, xSpeed);
}

//Game Controls Setup
navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

function setupGameControls() {
  if (gameControls === "keyboard") {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        // case 32: //space bar
        case 38: //up arrow
          if (pressed === false) {
            player.moveUp(ySpeed);
            pressed = true;
          }
          break;
        case 40: //down arrow
          if (pressed === false) {
            player.moveDown(ySpeed);
            pressed = true;
          }
          break;
        case 13: //enter button (start new game/unpause)
          if (isGameOver) {
            window.location.reload();
          }
          if (isPaused) {
            isPaused = false;
            themeAudio.play();
          }
          break;
        case 27: //esc button (pause)
          if (!isPaused && !isGameOver) {
            isPaused = true;
            themeAudio.pause();
          }
          break;
      }
    }, false);

    document.addEventListener('keyup', (e) => {
      pressed = false;
    }, false);
  } else if (gameControls === "voice") {
    voiceControls.addCommand("up", function () {
      player.moveUp(ySpeed);
    });

    voiceControls.addCommand("down", function () {
      player.moveDown(ySpeed);
    });

    voiceControls.addCommand("pause", function () {
      isPaused = true;
    });

    voiceControls.addCommand("unpause", function () {
      isPaused = false;
    });

    voiceControls.start();
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, function () {
        directions.classList.add("hidden");
        scoreBar.classList.remove("hidden");
        canvas.classList.remove("hidden");
        gameLoop();
      }, function (err) {
        console.log("The following error occurred: " + err.name);
      }
      );
    } else {
      console.log("getUserMedia not supported");
    }
  } else if (gameControls === "pitch") {
    //PITCH CONTROLS
    // const voice = new Wad({ source: 'mic' }); // At this point, your browser will ask for permission to access your microphone.
    // const tuner = new Wad.Poly();
    // tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
    // tuner.add(voice);

    // // voice.play(); // You must give your browser permission to access your microphone before calling play().

    // // tuner.updatePitch(); // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

    // const logPitch = function () {
    //   console.log(tuner.pitch);
    //   window.requestAnimationFrame(logPitch);
    // };
  }
}

//Main Game Loop
function gameLoop() {
  if (!isPaused && !isGameOver) {
    player.update();
    pipe1.update();
    pipe2.update();
    background1.update();
    background2.update();
    scoreBar.innerHTML = `Score: ${score}`;
    scoreBar.classList.remove("hidden");
    pausePage.classList.add("hidden");
    gameOverPage.classList.add("hidden");
    //PITCH CONTROLS: log pitch
    // logPitch();
  }

  drawGameObjects();

  if (isPaused) {
    scoreBar.classList.add("hidden");
    pausePage.classList.remove("hidden");
  } else if (isGameOver) {
    scoreBar.classList.add("hidden");
    pausePage.classList.add("hidden");
    finalScoreBar.innerHTML = `Final Score: ${score}`;
    gameOverPage.classList.remove("hidden");
    themeAudio.pause();
    if (gameControls === "voice") {
      voiceControls.stop();
    }
  }
  window.requestAnimationFrame(gameLoop);
}

function drawGameObjects() {
  ctx.clearRect(0, 0, 1000, 640);

  background1.draw();
  background2.draw();

  player.draw();
  pipe1.draw();
  pipe2.draw();
  //PITCH CONTROLS - calculate pitch
  // tuner.updatePitch(); // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.
}

//Establish event listeners for buttons
startButton.addEventListener("click", () => {
  splash.classList.add("hidden");
  directions.classList.remove("hidden");
});
keyboardButton.addEventListener("click", () => {
  gameControls = "keyboard";
  directions.classList.add("hidden");
  scoreBar.classList.remove("hidden");
  canvas.classList.remove("hidden");
  setupGameObjects();
  setupGameControls();
  themeAudio.play();
  gameLoop();
});
voiceButton.addEventListener("click", () => {
  gameControls = "voice";
  setupGameObjects();
  setupGameControls();
});
playAgainButton.addEventListener("click", () => {
  window.location.reload();
});