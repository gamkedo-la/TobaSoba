const TILE_W = 50;
const TILE_H = 50;
const TILE_GAP = 1;
const TILE_COLS = 40;
const TILE_ROWS = 25;
const ROOM_COLS = 40;
const ROOM_ROWS = 25;

var roomGrid = 
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	 1,0,0,0,0,0,1,6,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,5,1,0,1,5,1,0,1,1,5,1,1,
	 1,0,0,0,0,12,1,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	 1,0,0,0,0,0,1,0,0,14,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	 1,0,0,0,0,0,1,4,1,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	 1,0,0,0,0,0,1,1,1,1,1,1,0,5,0,1,1,0,0,1,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,1,
	 1,0,0,0,0,12,1,0,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,6,1,4,0,1,0,0,1,
	 1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,5,1,0,0,1,0,0,1,
	 1,0,0,1,0,0,0,0,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,1,0,1,0,1,0,0,1,0,0,1,
	 1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,
	 1,0,0,1,0,2,1,0,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,1,1,0,1,
	 1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,5,0,1,1,0,0,1,0,0,1,1,0,1,0,0,0,1,0,0,0,1,0,1,
	 1,7,1,9,12,10,1,1,1,0,0,0,1,1,15,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,1,
	 1,7,1,3,13,11,1,8,8,1,0,16,0,1,1,0,0,11,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,1,1,
	 1,1,1,1,1,1,1,8,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,
	 1,1,1,1,0,0,0,5,6,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,
	 1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,14,0,0,0,0,1,1,1,5,0,0,1,1,0,0,0,5,0,1,
	 1,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,1,1,0,1,
	 1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0,0,1,1,0,1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,
	 1,0,0,1,0,0,0,6,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,
	 1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,
	 1,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,0,0,0,0,0,5,1,0,0,1,
	 1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,1,1,1,0,0,1,1,
	 1,4,0,1,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,1,1,1,4,1,6,0,1,0,0,0,11,0,0,0,0,0,0,17,3,1,
	 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	 
var roomGridSimple = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,5,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
// roomGrid = roomGridSimple;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_TILE = 1;
const TILE_PLAYER = 2;
const TILE_WALL2 = 3;
const TILE_DOOR = 4;
const TILE_SNACK = 5;
const TILE_TREASURE = 6;
const TILE_GROUND1 = 7;
const TILE_GROUND2 = 8;
const TILE_START = 9;
const TILE_FLYINGENEMY = 10;
const TILE_PATROLENEMY = 11;
const TILE_PLATFORM = 12;
const TILE_SPRINGBOARD = 13;
const TILE_JUMPINGENEMY = 14;
const TILE_SPIKE = 15;
const TILE_BOOSTPAD = 16;
const TILE_BOOSTPAD_LEFT = 17;
const TILE_BOOSTPAD_RIGHT = 18;

function roomTileToIndex(tileCol, tileRow) {
	return (tileCol + ROOM_COLS*tileRow);
  }
  
  function getTileIndexAtPixelCoord(pixelX,pixelY) {
	var tileCol = pixelX / TILE_W;
	var tileRow = pixelY / TILE_H;
	
	// we'll use Math.floor to round down to the nearest whole number
	tileCol = Math.floor( tileCol );
	tileRow = Math.floor( tileRow );
  
	// first check whether the tile coords fall within valid bounds
	if(tileCol < 0 || tileCol >= ROOM_COLS ||
	   tileRow < 0 || tileRow >= ROOM_ROWS) {
	   //console.log("out of bounds:"+pixelX+","+pixelY);
	   //jumperReset();
	}
	
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
  }
  
  function brickTileToIndex(tileCol, tileRow) {
	  return (tileCol + TILE_COLS*tileRow);
  }
  
  function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
	  var tileCol = hitPixelX / TILE_W;
	  var tileRow = hitPixelY / TILE_H;
	  // using Math.floor to round down to the nearest whole number
	  tileCol = Math.floor( tileCol );
	  tileRow = Math.floor( tileRow );
  
	  // first check whether the jumper is within any part of the brick wall
	  if(tileCol < 0 || tileCol >= TILE_COLS ||
			tileRow < 0 || tileRow >= TILE_ROWS) {
			 return false;
	  }
  
	  var brickIndex = brickTileToIndex(tileCol, tileRow);
	  return (roomGrid[brickIndex] == 1);
  }
  
  function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_TREASURE ||
			checkTileType == TILE_SNACK ||
			checkTileType == TILE_DOOR);
  }
  function drawScene() {
	function clamp(value, min, max){
		if(value < min) return min;
		else if(value > max) return max;
		return value;
	}
		ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
		ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
	
		//Clamp the camera position to the world bounds while centering the camera around the player                                             
		var camX = clamp(-player.x + canvas.width/2, yourWorld.minX, yourWorld.maxX - canvas.width);
		var camY = clamp(-player.y + canvas.height/2, yourWorld.minY, yourWorld.maxY - canvas.height);
	
		ctx.translate( camX, camY );    
	
		drawRoom();
  } 
  
  function drawRoom() {
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileUPEdgeY = 0;
	
	for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) { // deal with one row at a time
	  
	  tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
	  
	  for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) { // left to right in each row
  
		var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this index
		if( tileTypeHasTransparency(tileTypeHere) ) {
			canvasContext.drawImage(tilePics[TILE_GROUND],tileLeftEdgeX,tileUPEdgeY);
		}
			canvasContext.drawImage(tilePics[tileTypeHere],tileLeftEdgeX,tileUPEdgeY);
		
		tileIndex++; // increment which index we're going to next check for in the room
		tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width
  
	  } // end of for eachCol
	  
	  tileUPEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
	  
	} // end of for eachRow    
  } // end of drawRoom()
  
  function drawBricks() {
	  for(var eachCol=0; eachCol<TILE_COLS; eachCol++) { // in each column...
		  for(var eachRow=0; eachRow<TILE_ROWS; eachRow++) { // in each row within that col
			  if( isBrickAtTileCoord(eachCol, eachRow) ) {
				  var brickLeftEdgeX = eachCol * TILE_W;
				  var brickTopEdgeY = eachRow * TILE_H;
				  colorRect(brickLeftEdgeX, brickTopEdgeY,
				  TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'blue' );
			  } // end of isBrickAtTileCoord()
		  } // end of for eachRow
	  } // end of for eachCol
  } // end of drawBricks()