const MINIMAP_TILE_SIZE = 2;

function drawMiniMap() {
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileUpEdgeY = 0;
	var tileCol = (jumperX - canvas.width/2) / TILE_W;
	var tileRow =(jumperY - canvas.height/2) /  TILE_H;
	
	// we'll use Math.floor to round down to the nearest whole number
    /*
	tileCol = Math.floor( tileCol );
	tileRow = Math.floor( tileRow );
	if (tileCol <0) {
		tileCol = 0;
	}
	if (tileRow <0) {
		tileRow = 0;
	}
	var screenCols = Math.floor(canvas.width/TILE_W) + 2;
	var screenRows = Math.floor(canvas.height/TILE_H) + 2;
	
	var leftCol = tileCol;
	var rightCol = leftCol+screenCols;
	var topRow = tileRow;
	var bottomRow = topRow+screenRows;
	if (rightCol >= ROOM_COLS) {
		rightCol = ROOM_COLS;
		leftCol = rightCol - screenCols;
	}
	if (bottomRow >= ROOM_ROWS) {
		bottomRow = ROOM_ROWS;
		topRow = bottomRow - screenRows;
	}*/
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
        colorRect(tileLeftEdgeX ,tileUpEdgeY, MINIMAP_TILE_SIZE, MINIMAP_TILE_SIZE, miniMapColor);

	  } // end of for eachCol
	} // end of for eachRow
	//draws walls on the world edge. should save dats so this code shouldn't stay.
} // end of drawRoom()
