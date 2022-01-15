const NATUREENEMY_RADIUS = 25;
  function NatureEnemyClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0.5;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_NATUREENEMY) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end foe for
      return false; // no more nature enemy
    }

    this.move = function(){
      if (dist(this.x - jumperX, this.y - jumperY) < 3*TILE_W) {
        var toPlayer = angTo(jumperX - this.x, jumperY - this.y);
        this.xv =  Math.sign(jumperX)*-1 * JUMP_POWER * Math.cos(toPlayer);
        this.yv = Math.sign(jumperY)*-1 * JUMP_POWER * Math.sin(toPlayer);;
      }
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
          case roomBackground:
          case TILE_TREASURE:
          case TILE_SNACK:
            this.x = nextX;
            this.y = nextY;
              break;
          case TILE_DOOR:
          case TILE_WALL:
            case TILE_PLAYER:
              break;
      }
    }

    this.playerCollide = function(){
      jumpTimer = 0;
      doneJumping = false;

      if (this.y - jumperY < 0) {
        Jumper.takeDamage();
        Jumper.bouncePlayer(this);
        Jumper.playerDeath();
      } else { 
        this.readyToRemove = true;
        enemyDeadSound.play();
      }
    }
     
     
    this.draw = function () {
      drawBitmapCenteredAtLocationWithRotation(natureEnemyPic, this.x, this.y,this.xv > 0);
    }
  }
  