var canvas, canvasContext;
var backgroundMusic = new BackgroundMusicClass();
var snackSound = new SoundOverlapsClass("audio/snack");
var jumpSound = new SoundOverlapsClass("audio/jump");
var groundSound = new SoundOverlapsClass("audio/ground");
var hitSound = new SoundOverlapsClass("audio/hit");
var hurtSound = new SoundOverlapsClass("audio/hurt");

const STATE_MENU = 0;
const STATE_PLAY = 1;
const STATE_CREDITS = 2;
var gameState = STATE_PLAY;

const INDENT = 40;

const SET_FRAMES_PER_SECOND = 30;

var enemyList = [];

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
  enemyList = [];
  var lookForAnotherFlyingEnemy = true;
  while(lookForAnotherFlyingEnemy ){
    var newFlyingEnemy = new FlyingEnemyClass();
    var flyingEnemyHasTile = newFlyingEnemy.reset();
    if (flyingEnemyHasTile){
      enemyList.push(newFlyingEnemy);
    }
    lookForAnotherFlyingEnemy = flyingEnemyHasTile;
  }
}

function update() {
	moveEverything();
	resizeCanvas();
	//variableDisplay();
}

function drawMenu() {
  colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'black');
  canvasContext.fillStyle = 'yellow';
  canvasContext.font = "50px Verdana";
  canvasContext.fillText("TobaSoba", INDENT-4, 80);
  canvasContext.font = "30px Verdana";
  canvasContext.fillText("created by Vaan Hope Khani", INDENT, 120);
  canvasContext.fillText("Left right arrow keys to run", INDENT, 200); 
  canvasContext.fillText("Up-arrow key or spacebar to jump", INDENT, 240);
  canvasContext.fillText("Press key P to play game", INDENT, 340);
  canvasContext.fillText("Press key C to view the Credits", INDENT, 380);
  canvasContext.fillText("Press key M to return here", INDENT, 420);
  canvasContext.fillText("Press L to leave editor, K to edit", INDENT, 480);
}

function drawCredits() {
  colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'black');
  canvasContext.font = "30px Verdana";
  canvasContext.fillStyle = 'orange';
  canvasContext.fillText("TobaSoba made at HomeTeam GameDev", INDENT, 80);

  canvasContext.fillText("Vaan Hope Khani", INDENT, 140);

  canvasContext.fillText("Press key P to play", INDENT, 420);
  canvasContext.fillText("Press key M for menu", INDENT, 460);
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
    for (var i=0; i < enemyList.length; i++){
      enemyList[i].draw();
    }
    //patrolEnemy.draw();
		endCameraPan();
		drawEnerrgyUI();
		drawEditor();
    drawDebug();
}

function moveEverything() {
	jumperMove();
  //patrolEnemy.move();
	moveInto();
	if (jumperOnGround){
		lastX = jumperX;
		lastY = jumperY;
	}
  for (var i=0; i < enemyList.length; i++){
    enemyList[i].move();
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