const boostPad_RADIUS = 25;
  function boostPadClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0;
    this.ang = 0;
    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_BOOSTPAD || roomGrid[arrayIndex] == TILE_BOOSTPAD_LEFT || roomGrid[arrayIndex] == TILE_BOOSTPAD_RIGHT) {
            if (roomGrid[arrayIndex] == TILE_BOOSTPAD_LEFT) {
              this.ang = -Math.PI/2;
            }
            if (roomGrid[arrayIndex] == TILE_BOOSTPAD_RIGHT) {
              this.ang = Math.PI/2;
            }
            roomGrid[arrayIndex] = TILE_GROUND;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no boostPad
    }
    this.move = function(){

    }

    this.playerCollide = function(){
      var pushAng = this.ang - Math.PI/2;
      jumperSpeedX = 3*JUMP_POWER * Math.cos(pushAng);
      jumperSpeedY = 3*JUMP_POWER * Math.sin(pushAng);
      jumperFallDelayFrames = 20; 
      hurtSound.play();
      console.log("Player Hit");   
     }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      canvasContext.rotate(this.ang);
      canvasContext.drawImage(boostPad,-boostPad_RADIUS,-boostPad_RADIUS,
        boostPad.width, 
      boostPad.height);
      canvasContext.restore();
    }
  }
  