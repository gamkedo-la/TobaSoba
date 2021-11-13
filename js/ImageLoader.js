var playerPic=document.createElement("img");
var natureBossPic=document.createElement("img");
var natureBossTailPic=document.createElement("img");
var playerPowerPic=document.createElement("img");
var patrolEnemyPic=document.createElement("img");
var flyingEnemyPic=document.createElement("img");
var jumperEnemyPic=document.createElement("img");
var darkEnemyPic=document.createElement("img");
var snackEmpty=document.createElement("img");
var snackFull=document.createElement("img");
var movingPlatform=document.createElement("img");
var springBoard=document.createElement("img");
var boostPad=document.createElement("img");
var spike=document.createElement("img");
var hangingBlade=document.createElement("img");
var crusher=document.createElement("img");
var natureboss=document.createElement("img");
var naturebosstail=document.createElement("img");
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
      {varName:playerPowerPic, theFile:"tobapower.png"},
      {varName:natureBossPic, theFile:"natureboss.png"},
      {varName:natureBossTailPic, theFile:"naturebosstail.png"},
      {varName:flyingEnemyPic, theFile:"flyingenemy.png"},
      {varName:patrolEnemyPic, theFile:"patrolenemy.png"},
      {varName:jumperEnemyPic, theFile:"jumpingEnemy.png"},
      {varName:darkEnemyPic, theFile:"darkenemy.png"},
      {varName:snackEmpty, theFile:"snackempty.png"},
      {varName:snackFull, theFile:"snackfull.png"},
      {varName:movingPlatform, theFile:"platform.png"},
      {varName:springBoard, theFile:"springBoard.png"},
      {varName:boostPad, theFile:"boostpad.png"},
      {varName:spike, theFile:"spike.png"},
      {varName:hangingBlade, theFile:"blade.png"},
      {varName:crusher, theFile:"crusher.png"},
      {tileType:TILE_GROUND, theFile:"ground.png"},
      {tileType:TILE_WALL, theFile:"wall.png"},
      {tileType:TILE_PLAYER, theFile:"toba.png"},
      {tileType:TILE_TREASURE, theFile:"treasure.png"},
      {tileType:TILE_SNACK, theFile:"snack.png"},
      {tileType:TILE_DOOR, theFile:"door.png"},
      {tileType:TILE_GROUND1, theFile:"ground1.png"},
      {tileType:TILE_GROUND2, theFile:"ground2.png"},
      {tileType:TILE_WALL2, theFile:"wall2.png"},
      {tileType:TILE_START, theFile:"start.png"},
      {tileType:TILE_FLYINGENEMY, theFile:"flyingenemy.png"},
      {tileType:TILE_PATROLENEMY, theFile:"patrolenemy.png"}, // Vince:  I believe this can be removed.  It duplicates patrolEnemyPic.
      {tileType:TILE_DARKENEMY, theFile:"darkenemy.png"},
      {tileType:TILE_JUMPINGENEMY, theFile:"jumpingEnemy.png"},
      {tileType:TILE_DARKENEMY, theFile:"darkenemy.png"},
      {tileType:TILE_PLATFORM, theFile:"platform.png"},
      {tileType:TILE_SPRINGBOARD, theFile:"springboard.png"},
      {tileType:TILE_BOOSTPAD, theFile:"boostpad.png"},
      {tileType:TILE_BOOSTPAD_RIGHT, theFile:"boostpad_R_editoronly.png"},
      {tileType:TILE_BOOSTPAD_LEFT, theFile:"boostpad_L_editoronly.png"},
      {tileType:TILE_SPIKE, theFile:"spike.png"},
      {tileType:TILE_WALL3, theFile:"naturewall.png"},
      {tileType:TILE_HANGINGBLADE, theFile:"blade.png"},
      {tileType:TILE_CRUSHER, theFile:"crusher.png"},
      {tileType:TILE_NATUREBOSS, theFile:"natureboss.png"},
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

