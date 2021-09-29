var canvas, canvasContext;
var backgroundMusic = new BackgroundMusicClass();
var Sound = new SoundOverlapsClass("audio/hit");
var showCredits = false;
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
canvasContext.fillText("Made at HomeTeam",250,35);
canvasContext.fillText("Created with",8,75);
canvasContext.fillText("Created By Vaan Hope Khani",8,195);
canvasContext.fillText("Arrow keys to run, UP or spacebar  to jump",8,255);
canvasContext.fillText("CLICK TO START",8,295);

}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (showCredits == true) {
		drawCredits();
		} 
		else {
		drawEverything();
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