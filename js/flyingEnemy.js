const FLYER_RADIUS = 25;
  function FlyingEnemyClass() {
    this.x = 75;
    this.y = 75;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_FLYINGENEMY) {
            roomGrid[arrayIndex] = TILE_GROUND;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end foe for
      return false; // no more traps
    }
    this.move = function(){
      //console.log('flyingenemy moving');
      
    }
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(flyingEnemyPic,-FLYER_RADIUS,-FLYER_RADIUS,
      flyingEnemyPic.width, 
      flyingEnemyPic.height);
      canvasContext.restore();
    }
  }
  