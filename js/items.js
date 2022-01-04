const SNACK_RADIUS = 25;
  function snackClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_SNACK) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no snack
    }
    this.move = function(){

    }

    this.playerCollide = function(){
      snackSound.play();
      hadPowerUp = Jumper.powerUpMode();
      snackHeld++; // get snack
      nowHasPowerUp = Jumper.powerUpMode();
      if (hadPowerUp == false && nowHasPowerUp) {
          jumperPowerUpTime = POWER_UP_FRAME_DURATION;
      }
      this.readyToRemove = true;
     }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(snack,-SNACK_RADIUS,-SNACK_RADIUS,
        snack.width, 
      snack.height);
      canvasContext.restore();
    }
  }
  
  const TREASURE_RADIUS = 25;
  function treasureClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_TREASURE) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no treasure
    }
    this.move = function(){

    }

    this.playerCollide = function(){
       //trophySound.play("hit");
       this.trophyHeld++; // get treasure
       this.readyToRemove = true;
     }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(treasure,-TREASURE_RADIUS,-TREASURE_RADIUS,
        treasure.width, 
      treasure.height);
      canvasContext.restore();
    }
  }
  
