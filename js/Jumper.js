const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;
const MAX_JUMP_DURATION_SECS = 0.5;

var framesPerSecond = 30;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = false;
var JUMPER_RADIUS = 15;
var jumpTimer = 0.0;


var holdLeft = false;
var holdRight = false;

var jumpVariables = [];
var jumpVariableNames = ["jumperRadius","runSpeed","jumperSpeedX", "jumpPower","jumperSpeedY", "groundFriction", "airResistance", "gravity"];

function jumperMove() {
	if(jumperOnGround) {
	   jumperSpeedX *= GROUND_FRICTION;
	 } else {
	   jumperSpeedX *= AIR_RESISTANCE;
	   jumperSpeedY += GRAVITY;
	   if(jumperSpeedY > JUMPER_RADIUS) { // cheap test to ensure can't fall through floor
		 jumperSpeedY = JUMPER_RADIUS;
	   }
	 }
   
	 if(holdLeft) {
	   jumperSpeedX = -RUN_SPEED;
	 }
	 if(holdRight) {
	   jumperSpeedX = RUN_SPEED;
	 }
   if(holdJump && jumpTimer <= MAX_JUMP_DURATION_SECS) {
    jumperSpeedY = -JUMP_POWER;
    console.log(jumpTimer);
    jumpTimer += 1 / framesPerSecond;
  }
	 if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY-JUMPER_RADIUS) == 1) {
	   jumperY = (Math.floor( jumperY / BRICK_H )) * BRICK_H + JUMPER_RADIUS;
	   jumperSpeedY = 0.0;
	 }
	 
	 if(jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX,jumperY+JUMPER_RADIUS) == 1) {
	   jumperY = (1+Math.floor( jumperY / BRICK_H )) * BRICK_H - JUMPER_RADIUS;
	   jumperOnGround = true;
	   jumperSpeedY = 0;
     jumpTimer = 0.0;
	 } else if(isBrickAtPixelCoord(jumperX,jumperY+JUMPER_RADIUS+2) == 0) {
	   jumperOnGround = false;
	 }
	 
	 if(jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX-JUMPER_RADIUS,jumperY) == 1) {
	   jumperX = (Math.floor( jumperX / BRICK_W )) * BRICK_W + JUMPER_RADIUS;
	 }
	 if(jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX+JUMPER_RADIUS,jumperY) == 1) {
	   jumperX = (1+Math.floor( jumperX / BRICK_W )) * BRICK_W - JUMPER_RADIUS;
	 }
	 
	 jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed 
	 jumperY += jumperSpeedY; // same as above, but for vertical
   }
 
   window.onload = function() {
	 canvas = document.getElementById('gameCanvas');
	 canvasContext = canvas.getContext('2d');
	 
	 initInput();
	 
	 // these next few lines set up our game logic and render to happen 30 times per second
	 setInterval(function() {
		 moveEverything();
		 drawEverything();
	   }, 1000/framesPerSecond);
	   
	 jumperReset();
   }
   
   function jumperReset() {
	 // center jumper on screen
	 jumperX = canvas.width/2;
	 jumperY = canvas.height/2;
   }
   
  // key controls used for this
  this.setupControls = function(upKey,rightKey,downKey,leftKey) {
    this.controlKeyForUP = upKey;
    this.controlKeyForRIGHT = rightKey;
    this.controlKeyForDOWN = downKey;
    this.controlKeyForLEFT = leftKey;
  }

  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }

  this.reset = function() {
	this.snackHeld = 0;
    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == TILE_PLAYER) {
          var tileRow = Math.floor(i/ROOM_COLS);
          var tileCol = i%ROOM_COLS;
          this.homeX = tileCol * TILE_W + 0.5*TILE_W;
          this.homeY = tileRow * TILE_H + 0.5*TILE_H;
          roomGrid[i] = TILE_GROUND;
          break; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if position not saved yet

    jumperX = this.homeX;
	jumperY = this.homeY;

  } // end of reset
  
  this.moveInto = function() {
    var nextX = jumperX;
	var nextY = jumperY;
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
    
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        break;
      case TILE_TREASURE:
		Sound.play("hit");
        this.treasureHeld++; // get treasure
		roomGrid[walkIntoTileIndex] = TILE_GROUND;
        break;
      case TILE_DOOR:
		Sound.play("hit");
		  console.log("DOOR");
        if(this.snackHeld > 0) {
          this.snackHeld--; // one less snack
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
        break;
      case TILE_SNACK:
		Sound.play("hit");
        this.snackHeld++; // get snack
        roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_WALL:
        break;
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }
  
  function jumperDraw() {
    canvasContext.save();
    canvasContext.translate(jumperX,jumperY);
    canvasContext.rotate(jumperX/20.0);
    canvasContext.drawImage(playerPic,-JUMPER_RADIUS,-JUMPER_RADIUS,
      playerPic.width, 
      playerPic.height);
    canvasContext.restore();
  }
  
  this.launch = function(){
  
  }
