const FLYER_RADIUS = 25;
  function FlyingEnemyClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0.5;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_FLYINGENEMY) {
            roomGrid[arrayIndex] = TILE_SKY;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end foe for
      return false; // no more flying enemy
    }

    this.move = function(){
      //console.log('flyingenemy moving');
      if (dist(this.x - jumperX, this.y - jumperY) < 3*TILE_W) {
        var toPlayer = angTo(jumperX - this.x, jumperY - this.y);
        this.xv = Math.sign(this.x) +  Math.cos(toPlayer);
        this.yv = Math.sign(this.y) +  Math.sin(toPlayer);
        //this.xv = Math.cos(toPlayer);
        //this.yv = Math.sin(toPlayer);
      }
      var nextX = this.x + this.xv;
      var nextY =  this.y + this.yv;
      
      var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
      var walkIntoTileType =  TILE_WALL;
  
      if (walkIntoTileIndex != undefined) {
          walkIntoTileType = roomGrid[walkIntoTileIndex];
      }
      
      if(walkIntoTileType != TILE_SKY) {
        this.xv = -this.xv;
        this.yv = -this.yv;
      } else {
        this.x = nextX;
        this.y = nextY;
      }
    }

      this.playerCollide = function(){
        // [TODO] fix jump height, make jump slightly when not holding space
        jumpTimer = 0;
        doneJumping = false;
        if (this.y >= JUMP_POWER * Math.cos(.06)) {
            Jumper.takeDamage();
            Jumper.bouncePlayer(this);
        }
     }
     
     
    this.draw = function () {
      drawBitmapCenteredAtLocationWithFlip(flyingEnemyPic, this.x, this.y,this.xv > 0);
    }
  }
  