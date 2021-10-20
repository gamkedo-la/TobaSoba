function PatrolEnemyClass (){

  this.x = 100;
  this.y = 100;
  this.speedX = 0;
  this.speedY = 0;
  this.runSpeed = 3;
  this.moveLeft = true;
  this.moveRight = false;

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
            if (worldEditor == false) {
                roomGrid[i] = TILE_GROUND;
            }
            break; // found it, so no need to keep searching 
        } // end of if for TILE_PATROLENEMY
    } // end of for
  } //end of this.reset

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
  }

  this.draw = function() {
    canvasContext.save();
    canvasContext.translate(this.x, this.y);
    canvasContext.rotate(this.x/20.0);
    canvasContext.drawImage(patrolEnemyPic,-JUMPER_RADIUS,-JUMPER_RADIUS, patrolEnemyPic.width, patrolEnemyPic.height);
    canvasContext.restore();
  }
}
