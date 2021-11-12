const CRUSHER_RADIUS = 25;
  function CrusherClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 0;
    this.yv = 5;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_CRUSHER) {
            roomGrid[arrayIndex] = TILE_GROUND;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no more crusher
    }
    this.move = function(){
      //console.log('flyingenemy moving');
      var nextX = this.x + this.xv;
      var nextY =  this.y + this.yv;
      var halfTileDirectionOffset;
      if (this.yv > 0) {
        halfTileDirectionOffset = TILE_H/2;
      } else {
        halfTileDirectionOffset = -TILE_H/2;
      }
      var walkIntoTileIndex = getTileIndexAtPixelCoord(this.x, this.y+halfTileDirectionOffset);
      var walkIntoTileType = TILE_WALL;
  
      if (walkIntoTileIndex != undefined) {
          walkIntoTileType = roomGrid[walkIntoTileIndex];
      }

      if(walkIntoTileType != TILE_GROUND) {
        this.xv = -this.xv;
        this.yv = -this.yv;
      } else {
        this.x = nextX;
        this.y = nextY;
      }
    }
    this.playerCollide = function(){
      Jumper.takeDamage();
      Jumper.playerDeath();
        if (jumperSpeedY > 0){
          jumperSpeedY = 0;
        }
      console.log("Player Hit");   
     }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(crusher,-CRUSHER_RADIUS,-CRUSHER_RADIUS,
        crusher.width, 
      crusher.height);
      canvasContext.restore();
    }
  }
  