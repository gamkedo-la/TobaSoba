const SPRINGBOARD_RADIUS = 25;
  function springBoardClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_SPRINGBOARD) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no springboard
    }
    this.move = function(){

    }

    this.playerCollide = function(){
      jumperSpeedY = -2*JUMP_POWER;
      jumpTimer += 1 / framesPerSecond;
      springSound.play();
      console.log("Player Hit");   
     }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(springBoard,-SPRINGBOARD_RADIUS,-SPRINGBOARD_RADIUS,
        springBoard.width, 
      springBoard.height);
      canvasContext.restore();
    }
  }
  