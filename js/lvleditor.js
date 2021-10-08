var worldEditor = true;

function drawEditor(){
    if (worldEditor == false) {
        return;
    }
    var wasFont = canvasContext.font;
    canvasContext.font = "30px Verdana";
    var fgColor = 'white';
    var bgColor = 'black';
    var lineX = 230;
    var lineY = 35;
    var skipY = 30;
    shadowText("EDITOR MODE",lineX,lineY, fgColor, bgColor);
    canvasContext.font = "18px Verdana";
    lineY += skipY
    shadowText("Press Tab to Toggle", lineX, lineY, fgColor, bgColor)
    lineY += skipY
    shadowText("Press T to teleport character to mouse location",  lineX, lineY, fgColor, bgColor)
    canvasContext.font = wasFont;
};

function shadowText(text, atX, atY, foregroundColor, backgroundColor){
    canvasContext.fillStyle = backgroundColor;
    canvasContext.fillText(text, atX+2, atY+2)
    canvasContext.fillStyle = foregroundColor;
    canvasContext.fillText(text, atX, atY)
}

function drawTiles(){

};

function selectTile(){

};

function editorKeyCheck(keyCode) {
    if (worldEditor == false) {
        if(keyCode == KEY_TAB) {
            worldEditor = true;
            return;
        }
    }
    tileIndex = getTileIndexAtPixelCoord(mousePos.x + cameraPanX, mousePos.y + cameraPanY);

    switch (keyCode) {
        case KEY_TAB:
            worldEditor = false;
            break;
        case KEY_0:
            roomGrid[tileIndex] = TILE_DOOR;
            break;
        case KEY_1:
            roomGrid[tileIndex] = TILE_SNACK;
            break;
         case KEY_2:
            roomGrid[tileIndex] = TILE_TREASURE;
            break;
         case KEY_3:
            //roomGrid[tileIndex] = TILE_GROUND1;
             break;   
        case KEY_4:
            //roomGrid[tileIndex] = TILE_GROUND2;
            break;
        case KEY_5:
            //roomGrid[tileIndex] = TILE_GROUND2;
            break;   
        case KEY_6:
            //roomGrid[tileIndex] = TILE_GROUND2;
            break;   
        case KEY_7:
            //roomGrid[tileIndex] = TILE_GROUND2;
            break;   
        case KEY_8:
            //roomGrid[tileIndex] = TILE_GROUND2;
            break;
        case KEY_9:
            //roomGrid[tileIndex] = TILE_GROUND2;
            break; 
    } 
}

function editLevel(){
   var currentLevel = JSON.parse(JSON.stringify(levelData))
    //newLevel.unshift(selectTiles());	
};


function generateLevel(){
var newLevel = JSON.parse(JSON.stringify(levelData)); // deep/clean copy since we'll modify it during loading
	//newLevel.unshift(editLevel);	
	return newLevel;
};
