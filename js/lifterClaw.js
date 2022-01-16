const LIFTERCLAW_RADIUS = 25;
  function LifterClawClass() {
    this.clawClosed = false;
    this.x = 75;
    this.y = 75;
    this.xv = 0;
    this.yv = 1;
    this.ignoreGrabFrame = 0;
  
    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_LIFTERCLAW) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no more clawLifter
    }
    this.move = function(){
      if (this.ignoreGrabFrame > 0) {
        this.ignoreGrabFrame--;
      } 
      //console.log('flyingenemy moving');
      var nextX = this.x + this.xv;
      var nextY =  this.y + this.yv;
      
      var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
      var walkIntoTileType = roomForeground;
  
      if (walkIntoTileIndex != undefined) {
          walkIntoTileType = roomGrid[walkIntoTileIndex];
      }

      if(walkIntoTileType != roomBackground) {
        this.xv = -this.xv;
        this.yv = -this.yv;
      } else {
        this.x = nextX;
        this.y = nextY;
      }
      if (this.clawClosed) {
        jumperX = this.x;//move with the clawLifter
        jumperY = this.y;

        jumperOnGround = true;
        jumperSpeedY = 0;
        jumpTimer = 0.0;
        doneJumping = false;
      }
    }

    this.playerEscaped = function() {
      this.clawClosed = false;
      jumperHeldByClaw = null;
      this.ignoreGrabFrame = 20;
      //console.log("playerEscaped");
    }
    this.playerCollide = function(){
      if (jumperHeldByClaw == null && this.ignoreGrabFrame<=0) { 
        this.clawClosed = true;
        jumperHeldByClaw = this;
      }
 
      /*
      if(jumperY >= this.y && jumperY <= this.y) {
        jumperX = this.x;//move with the clawLifter
        jumperY = this.y;
        jumperOnGround = true;
      }
      if (jumperSpeedY>0){
          jumperOnGround = false;
        jumperX += jumperSpeedY;//move with the clawLifter
        jumperY += jumperSpeedY;
        }*/ 
     }

    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      var useImage;
      if (this.clawClosed) {
        useImage = lifterClawClosed;
      } else {
        useImage = lifterClaw;
      }
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(useImage,-LIFTERCLAW_RADIUS,-LIFTERCLAW_RADIUS,
        lifterClaw.width,
      lifterClaw.height);
      canvasContext.restore();
    }
  }
  