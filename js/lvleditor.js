var worldEditor = true;

function drawEditor(minimapY){

    if (gameState == STATE_MENU) return;

    if (worldEditor == false) {
        return;
    }
    var wasFont = canvasContext.font;
    canvasContext.font = "30px Verdana";
    var fgColor = 'white';
    var bgColor = 'black';
    var lineX = 230;
    var lineY = minimapY + 100;
    var skipY = 30;
    shadowText("EDITOR MODE",lineX,lineY, fgColor, bgColor);
    canvasContext.font = "18px Verdana";
    lineY += skipY
    shadowText("Press Tab to Toggle", lineX, lineY, fgColor, bgColor)
    lineY += skipY
    shadowText("Press T to teleport character to mouse location",  lineX, lineY, fgColor, bgColor)
    lineY += skipY
    shadowText("Press Control/Command key to export the level",  lineX, lineY, fgColor, bgColor)
    lineY += skipY
    shadowText("Press number 9 to place " + ALLTILES[editorItem] ,  lineX, lineY, fgColor, bgColor)
    canvasContext.font = wasFont;
};


function drawTiles(){

};

function selectTile(){

};
editorItem = 0;
function editorKeyCheck(keyCode) {

    if (gameState == STATE_MENU) return;

    if (worldEditor == false) {
        if(keyCode == KEY_TAB) {
            worldEditor = true;
            reset();
            return;
        }
    }
    let  mouseX = mousePos.x;
    let  mouseY = mousePos.y;
    tileIndex = getTileIndexAtPixelCoord(mouseX + cameraPanX, mouseY + cameraPanY);
    /*const keys = Object.keys(ALLTILES);
    keys.forEach((key, index) => {
        items = (`${key}: ${ALLTILES[key]}`);
    });*/
    switch (keyCode) {
        case KEY_TAB:
            worldEditor = false;
            roomGridMaster =roomGrid.slice();
            reset();
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
            roomGrid[tileIndex] = TILE_PLAYER;
             break;   
        case KEY_4:
            roomGrid[tileIndex] = TILE_PATROLENEMY;
            break;
        case KEY_5:
            roomGrid[tileIndex] = TILE_FLYINGENEMY;
            break;   
        case KEY_6:
            //roomGrid[tileIndex] = TILE_SKY2;
            break;   
        case KEY_7:
            //roomGrid[tileIndex] = TILE_SKY2;
            break;   
        case KEY_8:
            updateMiniMap();
            break;
        case KEY_9:
            roomGrid[tileIndex] = editorItem;
            break; 
        case KEY_CTRL:
            exportLevel();
            break; 
        case KEY_PAGE_UP:
            editorItem++;
            if (editorItem  > ALLTILES.length - 1) {
                editorItem =0;
            }  
            console.log(editorItem); 
            break
        case KEY_PAGE_DOWN:
            editorItem--;
            if (editorItem < 0) {
                editorItem = ALLTILES.length -1 ;
            }
            console.log(editorItem); 
            break
    } 
}

function exportLevel(){
   var currentLevel = JSON.stringify(roomGrid);
    console.log(currentLevel);
};

