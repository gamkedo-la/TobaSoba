var playerPic=document.createElement("img");
var patrolEnemyPic=document.createElement("img");
var flyingEnemyPic=document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    startGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode],fileName);
}

function loadImages() {
    var imageList = [
      {varName:playerPic, theFile:"toba.png"},
      {varName:flyingEnemyPic, theFile:"flyingenemy.png"},
      {varName:patrolEnemyPic, theFile:"patrolenemy.png"},
      {tileType:TILE_GROUND, theFile:"ground.png"},
      {tileType:TILE_WALL, theFile:"wall.png"},
      {tileType:TILE_TREASURE, theFile:"treasure.png"},
      {tileType:TILE_SNACK, theFile:"snack.png"},
      {tileType:TILE_DOOR, theFile:"door.png"},
      {tileType:TILE_GROUND1, theFile:"ground1.png"},
      {tileType:TILE_GROUND2, theFile:"ground2.png"},
      {tileType:TILE_WALL2, theFile:"wall2.png"},
      {tileType:TILE_START, theFile:"start.png"},
      ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages

