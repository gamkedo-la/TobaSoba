var patrolEnemyList = [];

function addPatrolEnemy(){
	var tempPatrolEnemy = new PatrolEnemyClass();
	patrolEnemyList.push(tempPatrolEnemy);
}

function PatrolEnemyClass (){

  this.x = 100;
  this.y = 100;
  this.width = 30;
  this.speedX = 0;
  this.speedY = 0;
  this.runSpeed = 0.5;
  this.moveLeft = true;
  this.moveRight = false;
  this.collisionBox = "green"

  this.init = function(whichGraphic, whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }

  this.reset = function() {
    for (var i = 0; i < roomGrid.length; i++) {
        if (roomGrid[i] == TILE_PATROLENEMY) {
            var tileRow = Math.floor(i / ROOM_COLS);
            var tileCol = i % ROOM_COLS;
            this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
            this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
          //  if (!worldEditor) {      //Vince:  This will need a work around.  It is preventing Enemy's from erasing their tile upon initiation.  10/20/2021
                roomGrid[i] = TILE_GROUND;
            //}
            this.x = this.homeX;
            this.y = this.homeY;
            break; 
        } 
    } 
  } 

  this.move = function(){
    if(this.moveLeft){
      this.speedX = -this.runSpeed;
      this.moveRight = false;
    }
    if(this.moveRight){
      this.speedX = this.runSpeed;
      this.moveLeft = false;
    }
    this.speedX *= GROUND_FRICTION;
    this.moveInto();
    this.x += this.speedX
  }

  this.moveInto = function() { //Vince:  This can be refactored into a parent class with the Jumper 10/20/2021
    let nextX, nextY;
    nextY = this.y + this.speedY;
    if(this.moveLeft){
      nextX = this.x + this.speedX - this.width/2;
    }
    if(this.moveRight){
      nextX = this.x + this.speedX + this.width/2;
    }
    
    
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
   // var walkIntoTileType = TILE_WALL;

    if (walkIntoTileIndex != undefined) {
        walkIntoTileType = roomGrid[walkIntoTileIndex];
    }

    switch (walkIntoTileType) {
        case TILE_GROUND:
        case TILE_TREASURE:
        case TILE_SNACK:
          this.x = nextX;
          this.y = nextY;
            break;
        case TILE_DOOR:
        case TILE_WALL:
          this.changeDirection();
            break;
    }
}

this.checkCollisionAgainstPlayer = function(playerX, playerY, playerWidth, playerHeight){
  if( this.x > playerX &&
      this.x < playerX + playerWidth &&
      this.y > playerY &&
      this.y < playerY + playerHeight){
        console.log("Player Hit");
        jumperCollisionBox = "red";
      } else {
        jumperCollisionBox = "green";
      }
    
}

this.changeDirection = function(){
  if(this.moveLeft){ //change from Left to Right motion
    this.moveLeft = false;
    this.moveRight = true;
  } else { //change from right to left motion
    this.moveLeft = true;
    this.moveRight = false;
  }
}

  this.draw = function() {
    canvasContext.save();
    canvasContext.translate(this.x, this.y);
    canvasContext.rotate(this.x/20.0);
    canvasContext.drawImage(patrolEnemyPic,-JUMPER_RADIUS,-JUMPER_RADIUS, patrolEnemyPic.width, patrolEnemyPic.height);
    canvasContext.restore();
  }
}
