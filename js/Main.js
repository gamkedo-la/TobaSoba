var miniMapCanvas;
var miniMapCanvasContext;
var canvas, canvasContext;
var backgroundMusic = new BackgroundMusicClass("audio/TobaSoba_Music_2");
var snackSound = new SoundOverlapsClass("audio/snack");
var jumpSound = new SoundOverlapsClass("audio/jump");
var groundSound = new SoundOverlapsClass("audio/ground");
var hitSound = new SoundOverlapsClass("audio/hit");
var hurtSound = new SoundOverlapsClass("audio/hurt");
var cheerSound = new SoundOverlapsClass("audio/cheer");
var doorSound = new SoundOverlapsClass("audio/door");
var springSound = new SoundOverlapsClass("audio/springboard");
var boostpadSound = new SoundOverlapsClass("audio/boostpad");
var deathSound = new SoundOverlapsClass("audio/death");
var enemyDeadSound = new SoundOverlapsClass("audio/enemydeath");
var alarmSound = new SoundOverlapsClass("audio/alarm");

var patrolEnemy1NameList = ["Safiya","Halima", "Scipio", "Kofi", "Maisha", "Diara", "Kesia", "Tau", "Chidi", "Bahari"]
var showCollisionBoxes = false;

const STATE_MENU = 0;
const STATE_PLAY = 1;
const STATE_CREDITS = 2;
const STATE_GAME_OVER = 3;
const STATE_EDIT = 4;
const STATE_OUTRO = 5;
const INDENT = 40;
const SET_FRAMES_PER_SECOND = 30;
const minimapX = 40;
const minimapY = 40;

var snackHeld = 4;
var paused = false;
var gameState = STATE_PLAY;
var gameIsover = false;
var showMinimap = true;
var enemyList = [];
var showIntro = true;
var showOutro = false;
WATERFALL_FRAMES=5;
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  miniMapCanvas = document.createElement('canvas');
  miniMapCanvas.width = MINIMAP_TILE_SIZE*ROOM_COLS;
  miniMapCanvas.height = MINIMAP_TILE_SIZE*ROOM_ROWS;
  miniMapCanvasContext = miniMapCanvas.getContext('2d');
	initInput();
	loadImages();

}

function startGame() {
  Jumper = new JumperClass();
 // these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
  setInterval(function() {
    if(!paused)
    { 
    update(); 
    }
    }, 1000/framesPerSecond);
  if ( roomGridMaster == roomGridList[0] ||  roomGridList[1]){
      backgroundMusic.loopSong("audio/toba_soba-letsgo");
    }
   
  //init( playerPic , "toba");
  loadLevel(0);
  if (showIntro) { // used to bypass menu when doing frequent gameplay testing, not used after game start
    gameState = STATE_MENU;
  } else {
      gameState = STATE_PLAY;
  }	
}

function update() {
	if (gameState==STATE_PLAY) {
        moveEverything();
    }
    updateParticles();
	resizeCanvas();
	//variableDisplay();
}

function resizeCanvas() {
  if(canvas.width != window.innerWidth) {
  	canvas.width = window.innerWidth;
  	canvas.height = window.innerHeight;
  }

  switch (gameState) {
    case STATE_MENU:
      drawEverything();
      drawMenu();
      drawPrologue();
      break;
    case STATE_PLAY:
      drawEverything();
      break;
    case STATE_CREDITS:
      drawCredits();
      break;
      case STATE_GAME_OVER:
        gameOverScreen();
        pause = true;
      break;
      case STATE_OUTRO:
        drawEpilogue();
        break;
  }
}

function drawEverything() {
    if (USE_BIG_SKY) {
        // optionally draw a big sky image as a backrop
        // console.log("drawing a big sky!");
        canvasContext.drawImage(bigskyPic,0,0,canvas.width,canvas.height);
    }
    
  cameraPan();
	drawRoom();

    for (var i=0; i < enemyList.length; i++){
      if (enemyList[i].sleep == false) {
        enemyList[i].draw();
      }
    }

    Jumper.Draw();
    drawParticles();

    endCameraPan();
		drawEnerrgyUI();
    drawTrophyUI();
		drawEditor(minimapY);
    drawDebug(); 
    if (showMinimap == true) {
      drawMiniMap(minimapX,minimapY);
    }
    if(gameState != STATE_MENU) {
      shadowText("M for Menu & Controls",5,canvas.height-5,'silver','15px Verdana','left');
    }
}

function moveEverything() {
	Jumper.move();
	Jumper.moveInto();
	if (jumperOnGround){
		lastX = jumperX;
		lastY = jumperY;
	}
  if (!worldEditor) {
    for (var i=0; i < enemyList.length; i++){
      var playerDist = dist(enemyList[i].x - jumperX, enemyList[i].y - jumperY);
      enemyList[i].sleep = playerDist > 2000;
      if (enemyList[i].sleep == false) {
        enemyList[i].move();
      }
    }
    for (var i = enemyList.length-1; i>=0;i--) {
      if (enemyList[i].readyToRemove) {
        enemyList.splice(i,1);
      }
    }
  }
  
  
  checkForPlayerCollision();
}

function checkForPlayerCollision(){
  for(var i = 0; i < enemyList.length; i++){
    Jumper.CollisionCheck(enemyList[i]);
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
        var boxWidth = 140;
        var boxHeight = 60;
        colorRect( canvas.width/2-(boxWidth/2), canvas.height/2-(boxHeight/2)-10, boxWidth,boxHeight, 'black');
        var wasAlign = canvas.textAlign;
        canvasContext.textAlign = "center";
        colorText("PAUSED",canvas.width/2, canvas.height/2 , 30, 'white');
        canvasContext.textAlign = wasAlign;
    } else if (paused)
    {
       paused= false;
    }

}

function loadLevel (whichLevel) {
  roomGridMaster = roomGridList[whichLevel];
  ROOM_COLS = roomSizes[whichLevel].roomCols;
  ROOM_ROWS = roomSizes[whichLevel].roomRows;
  roomBackground = roomTilesBack[whichLevel];
  roomForeground = roomTilesFor[whichLevel];
  miniMapCanvas.width = MINIMAP_TILE_SIZE*ROOM_COLS;
  miniMapCanvas.height = MINIMAP_TILE_SIZE*ROOM_ROWS;
  miniMapCanvasContext = miniMapCanvas.getContext('2d');
  reset();
  updateMiniMap();
}

function reset () {
  roomGrid = roomGridMaster.slice();
  Jumper.init();
  enemyList = [];
  jumperEnemyList = [];
  patrolEnemy1NameList = [];
  Jumper.restoreSnacks();

  cameraInstantJump();

  if (worldEditor) {
    return;
  }
  var lookForAnotherNatureEnemy = true;
  while(lookForAnotherNatureEnemy ){
    var newNatureEnemy = new NatureEnemyClass();
    var natureEnemyHasTile = newNatureEnemy.reset();
    if (natureEnemyHasTile){
      enemyList.push(newNatureEnemy);
    }
    lookForAnotherNatureEnemy = natureEnemyHasTile;
  }
  var lookForAnotherNatureBoss = true;
  while(lookForAnotherNatureBoss ){
    var newNatureBoss = new NatureBossClass();
    var natureBossHasTile = newNatureBoss.reset();
    if (natureBossHasTile){
      enemyList.push(newNatureBoss);
    }
    lookForAnotherNatureBoss = natureBossHasTile;
  }
  var lookForAnotherDarkEnemy = true;
  while(lookForAnotherDarkEnemy ){
    var newDarkEnemy = new DarkEnemyClass();
    var darkEnemyHasTile = newDarkEnemy.reset();
    if (darkEnemyHasTile){
      enemyList.push(newDarkEnemy);
    }
    lookForAnotherDarkEnemy = darkEnemyHasTile;
  }
  var lookForAnotherFlyingEnemy = true;
  while(lookForAnotherFlyingEnemy ){
    var newFlyingEnemy = new FlyingEnemyClass();
    var flyingEnemyHasTile = newFlyingEnemy.reset();
    if (flyingEnemyHasTile){
      enemyList.push(newFlyingEnemy);
    }
    lookForAnotherFlyingEnemy = flyingEnemyHasTile;
  }
  var lookForAnotherHangingBlade = true;
  while(lookForAnotherHangingBlade ){
    var newHangingBlade = new  HangingBladeClass();
    var HangingBladeHasTile = newHangingBlade.reset();
    if (HangingBladeHasTile){
      enemyList.push(newHangingBlade);
    }
    lookForAnotherHangingBlade = HangingBladeHasTile;
  }
  var lookForAnotherMovingCloud = true;
  while(lookForAnotherMovingCloud ){
    var newMovingCloud = new cloudClass();
    var movingCloudHasTile = newMovingCloud.reset();
    if (movingCloudHasTile){
      enemyList.push(newMovingCloud);
    }
    lookForAnotherMovingCloud = movingCloudHasTile;
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
  var lookForAnotherStonePlatform = true;
  while(lookForAnotherStonePlatform ){
    var newStonePlatform = new  movingPlatformClass();
    var stonePlatformHasTile = newStonePlatform.reset();
    if (stonePlatformHasTile){
      enemyList.push(newStonePlatform);
    }
    lookForAnotherStonePlatform = stonePlatformHasTile;
  }
  var lookForAnotherCrusher = true;
  while(lookForAnotherCrusher ){
    var newCrusher = new  CrusherClass();
    var crusherHasTile = newCrusher.reset();
    if (crusherHasTile){
      enemyList.push(newCrusher);
    }
    lookForAnotherCrusher = crusherHasTile;
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
  var lookForAnotherBoostPad = true;
  while(lookForAnotherBoostPad){
    var newBoostPad = new  boostPadClass();
    var BoostPadHasTile = newBoostPad.reset();
    if (BoostPadHasTile){
      enemyList.push(newBoostPad);
    }
    lookForAnotherBoostPad = BoostPadHasTile;
  }
    var lookForAnotherSpike = true;
  while(lookForAnotherSpike){
    var newSpike = new  spikeClass();
    var spikeHasTile = newSpike.reset();
    if (spikeHasTile){
      enemyList.push(newSpike);
    }
    lookForAnotherSpike = spikeHasTile;
  }
  var lookForAnotherSnack = true;
  while(lookForAnotherSnack){
    var newSnack = new  snackClass();
    var snackHasTile = newSnack.reset();
    if (snackHasTile){
      enemyList.push(newSnack);
    }
    lookForAnotherSnack = snackHasTile;
  }
  var lookForAnotherTreasure = true;
  while(lookForAnotherTreasure){
    var newTreasure = new  treasureClass();
    var treasureHasTile = newTreasure.reset();
    if (treasureHasTile){
      enemyList.push(newTreasure);
    }
    lookForAnotherTreasure = treasureHasTile;
  }
  var lookForAnotherPatrolEnemy = true;
  while(lookForAnotherPatrolEnemy){
    var newPatrolEnemy = new  PatrolEnemyClass();
    var patrolEnemyHasTile = newPatrolEnemy.reset();
    if (patrolEnemyHasTile){
      enemyList.push(newPatrolEnemy);
    }
    lookForAnotherPatrolEnemy = patrolEnemyHasTile;
  }
  var lookForAnotherJumpingEnemy = true;
  while(lookForAnotherJumpingEnemy){
    var newJumpingEnemy = new  JumperEnemyClass();
    var jumpingEnemyHasTile = newJumpingEnemy.reset();
    if (jumpingEnemyHasTile){
      enemyList.push(newJumpingEnemy);
    }
    lookForAnotherJumpingEnemy = jumpingEnemyHasTile;
  }
  var lookForAnotherFactoryEnemy = true;
  while(lookForAnotherFactoryEnemy){
    var newFactoryEnemy = new  FactoryEnemyClass();
    var factoryEnemyHasTile = newFactoryEnemy.reset();
    if (factoryEnemyHasTile){
      enemyList.push(newFactoryEnemy);
    }
    lookForAnotherFactoryEnemy = factoryEnemyHasTile;
  }
  var lookForAnotherFactoryBoss = true;
  while(lookForAnotherFactoryBoss){
    var newFactoryBoss = new FactoryBossClass();
    var factoryBossHasTile = newFactoryBoss.reset();
    if (factoryBossHasTile){
      enemyList.push(newFactoryBoss);
    }
    lookForAnotherFactoryBoss = factoryBossHasTile;
  }
  var lookForAnotherMagnetLifter = true;
  while(lookForAnotherMagnetLifter){
    var newMagnetLifter = new  MagnetLifterClass();
    var magnetLifterHasTile = newMagnetLifter.reset();
    if (magnetLifterHasTile){
      enemyList.push(newMagnetLifter);
    }
    lookForAnotherMagnetLifter = magnetLifterHasTile;
  }
  var lookForAnotherLifterClaw = true;
  while(lookForAnotherLifterClaw){
    var newLifterClaw = new  LifterClawClass();
    var lifterClawHasTile = newLifterClaw.reset();
    if (lifterClawHasTile){
      enemyList.push(newLifterClaw);
    }
    lookForAnotherLifterClaw = lifterClawHasTile;
  }
  /*
  for(var i = 0; i < patrolEnemyList.length; i++){
		patrolEnemyList[i].init(patrolEnemyPic, patrolEnemy1NameList[i]);
	}
  for(var i = 0; i < jumperEnemyList.length; i++){
    console.log("Found Jumper Enemy");
		jumperEnemyList[i].init(jumperEnemyPic, patrolEnemy1NameList[i]);
	}
  for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_PATROLENEMY){
			addPatrolEnemy();
		}
    if(roomGrid[i] == TILE_JUMPINGENEMY){
      addJumperEnemy();
	  }
  }*/
}
