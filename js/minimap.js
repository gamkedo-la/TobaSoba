const MINIMAP_TILE_SIZE = 1;
function drawMiniMap (x, y) {
	var tileCol = (cameraPanX) / TILE_W;
	var tileRow =(cameraPanY) /  TILE_H;
	var screenCols = Math.floor(canvas.width/TILE_W) + 2;
	var screenRows = Math.floor(canvas.height/TILE_H) + 2;
	var minimapHorizantalPercent = tileCol/ROOM_COLS;
	var scrollOverlap = ROOM_COLS - canvas.width;
	if (scrollOverlap > 0) {
		x -= scrollOverlap*minimapHorizantalPercent*1.99;
	} 
	canvasContext.drawImage(miniMapCanvas, x,y);
	mapRectOutline(x+tileCol*MINIMAP_TILE_SIZE, y+tileRow*MINIMAP_TILE_SIZE, screenCols*MINIMAP_TILE_SIZE, screenRows*MINIMAP_TILE_SIZE, "red");
} 
function updateMiniMap() {
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileUpEdgeY = 0;
	
	// we'll use Math.floor to round down to the nearest whole number
 
    var leftCol = 0;
    var rightCol = ROOM_COLS;
    var topRow = 0;
    var bottomRow = ROOM_ROWS;
	for(var eachRow=topRow; eachRow<bottomRow; eachRow++) { // deal with one row at a time 
	  for(var eachCol=leftCol; eachCol<rightCol; eachCol++) { // left to right in each row
		tileIndex = brickTileToIndex(eachCol,eachRow);
		var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this index
		tileLeftEdgeX = eachCol*MINIMAP_TILE_SIZE;
		tileUpEdgeY = eachRow*MINIMAP_TILE_SIZE;
        var miniMapColor;
        if (tileTypeHasWallCollision(tileTypeHere)) {
            miniMapColor = "grey";
        } else {
            miniMapColor = "white";
        }
        mapRect(tileLeftEdgeX, tileUpEdgeY, MINIMAP_TILE_SIZE, MINIMAP_TILE_SIZE, miniMapColor);

	  } // end of for eachCol
	} // end of for eachRow
	//draws walls on the world edge. should save dats so this code shouldn't stay.
} // end of drawRoom()
