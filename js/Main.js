var canvas, canvasContext;
var backgroundMusic = new BackgroundMusicClass();
var Sound = new SoundOverlapsClass("audio/hit");

const STATE_MENU = 0;
const STATE_PLAY = 1;
const STATE_CREDITS = 2;
var gameState = STATE_CREDITS;

const INDENT = 20;

const SET_FRAMES_PER_SECOND = 30;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	initInput();
	loadImages();
}

function startGame() {
 // these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
  setInterval(function() {
		update();
    }, 1000/framesPerSecond);
  //backgroundMusic.loopSong("audio/S");

  //init( playerPic , "toba");
  reset();
}

function update() {
	moveEverything();
	resizeCanvas();
	//variableDisplay();
}

function drawCredits() {
  colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'black');
  canvasContext.font = "30px Verdana";
  canvasContext.fillStyle = 'brown';
  canvasContext.fillText("Made at HomeTeam", INDENT, 35);
  canvasContext.fillText("Created with", INDENT, 75);
  canvasContext.fillText("Created by Vaan Hope Khani", INDENT, 195);
  canvasContext.fillText("Arrow keys to run, Up-arrow key or spacebar to jump", INDENT, 255);
  canvasContext.fillText("Press key P to start playing", INDENT, 295);
  canvasContext.fillText("Press key M to return to this menu", INDENT, 335);
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

  switch (gameState) {
    case STATE_MENU:
      drawMenu();
      break;
    case STATE_PLAY:
      drawEverything();
      break;
    case STATE_CREDITS:
      drawCredits();
      break;
  }
}

function drawEverything() {
		cameraPan();
		drawRoom();
		jumperDraw();
		endCameraPan();
		drawEditor();
}

function moveEverything() {
	jumperMove();
	moveInto();
	if (jumperOnGround){
		lastX = jumperX;
		lastY = jumperY;
	}
}

function variableDisplay() {
	var jumpVariables = [jumperRadius,runSpeed,jumperSpeedX, jumpPower,jumperSpeedY, groundFriction, airResistance, gravity];
	var textXPosition = canvas.width - 140;
	var textYPosition = 14;
	canvasContext.fillstyle = "white";
	canvasContext.font = "15px Verdana";
	for (var j = 0; j < jumpVariables.length; j++) {
		canvasContext.fillText(jumpVariableNames[j] + " : " + jumpVariables[j],textXPosition,textYPosition);
		textYPosition += 14;
	}
}