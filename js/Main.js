var canvas, canvasContext;
var backgroundMusic = new BackgroundMusicClass();
var snackSound = new SoundOverlapsClass("audio/snack");
var jumpSound = new SoundOverlapsClass("audio/jump");
var groundSound = new SoundOverlapsClass("audio/ground");
var hitSound = new SoundOverlapsClass("audio/hit");
var hurtSound = new SoundOverlapsClass("audio/hurt");
var doorSound = new SoundOverlapsClass("audio/door");
var springSound = new SoundOverlapsClass("audio/springboard");

var patrolEnemy1NameList = ["Safiya","Halima", "Scipio", "Kofi", "Maisha", "Diara", "Kesia", "Tau", "Chidi", "Bahari"]
var showCollisionBoxes = false;

const STATE_MENU = 0;
const STATE_PLAY = 1;
const STATE_CREDITS = 2;
var gameState = STATE_PLAY;

const INDENT = 40;
const SET_FRAMES_PER_SECOND = 30;
var paused = false;

var enemyList = [];

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	initInput();
	loadImages();
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_PATROLENEMY){
			addPatrolEnemy();
		}
    if(roomGrid[i] == TILE_JUMPINGENEMY){
      addPatrolEnemy();
	  }
  }
}

function startGame() {
 // these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
  setInterval(function() {
    if(!paused)
{ 
update(); 
}
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
  var lookForAnotherMovingPlatform = true;
  while(lookForAnotherMovingPlatform ){
    var newMovingPlatform = new  movingPlatformClass();
    var movingPlatformHasTile = newMovingPlatform.reset();
    if (movingPlatformHasTile){
      enemyList.push(newMovingPlatform);
    }
    lookForAnotherMovingPlatform = movingPlatformHasTile;
  }
  var lookForAnotherSpringBoard = true;
  while(lookForAnotherSpringBoard){
    var newSpringBoard = new  springBoardClass();
    var springBoardHasTile = newSpringBoard.reset();
    if (springBoardHasTile){
      enemyList.push(newSpringBoard);
    }
    lookForAnotherSpringBoard = springBoardHasTile;
  }
  for(var i = 0; i < patrolEnemyList.length; i++){
		patrolEnemyList[i].init(patrolEnemyPic, patrolEnemy1NameList[i]);
	}
  for(var i = 0; i < jumperEnemyList.length; i++){
		jumperEnemyList[i].init(patrolEnemyPic, patrolEnemy1NameList[i]);
	}
}

function update() {
	moveEverything();
    updateParticles();
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
    for(var i=0; i < patrolEnemyList.length; i++){
      patrolEnemyList[i].draw();
    }
    for(var i = 0; i < jumperEnemyList.length; i++){
      jumperEnemyList[i].draw();
    }

    drawParticles();

    endCameraPan();
		drawEnerrgyUI();
		drawEditor();
    drawDebug();
    
}

function moveEverything() {
	jumperMove();
	moveInto();
	if (jumperOnGround){
		lastX = jumperX;
		lastY = jumperY;
	}
  for (var i=0; i < enemyList.length; i++){
    enemyList[i].move();
  }
  //patrolEnemy1.move(); //Vince:  This will move to the enemyList once refactored 10/20/2021
  for(var i = 0; i < patrolEnemyList.length; i++){
		patrolEnemyList[i].move();
	}
  for(var i = 0; i < jumperEnemyList.length; i++){
    jumperEnemyList[i].move();
  }
  
  checkForPlayerCollision();
}

function checkForPlayerCollision(){
  for(var i = 0; i < patrolEnemyList.length; i++){
    jumperCollisionCheck(patrolEnemyList[i]);
  }
  for(var i = 0; i < jumperEnemyList.length; i++){
    jumperCollisionCheck(jumperEnemyList[i]);
  }
  for(var i = 0; i < enemyList.length; i++){
    jumperCollisionCheck(enemyList[i]);
  }
}

function dist(dx, dy) {
  return Math.sqrt(dx*dx+dy*dy);
}
function angTo(dx,dy){
  return Math.atan2(dy,dx);
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

function togglePause()
{
    if (!paused)
    {
        paused = true;
    } else if (paused)
    {
       paused= false;
    }

}
window.addEventListener('keydown', function (e) {
  var key = e.keyCode;
  if (key === 80)// p key
  {
      togglePause();
  }
  });
  