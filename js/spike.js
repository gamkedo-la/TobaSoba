const spike_RADIUS = 25;
  function spikeClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_SPIKE) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no spike
    }
    this.move = function(){

    }

    this.playerCollide = function(){
      Jumper.takeDamage();
      Jumper.bouncePlayer(this);
      Jumper.playerDeath();
     }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(spike,-spike_RADIUS,-spike_RADIUS,
        spike.width, 
      spike.height);
      canvasContext.restore();
    }
  }
  