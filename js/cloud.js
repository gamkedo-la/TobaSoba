const CLOUD_RADIUS = 25;
  function cloudClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0;

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_MOVINGCLOUD) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no more platform
    }
    this.move = function(){
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
    }
    this.playerCollide = function(){ 
     }
     
     let myClouds = [cloud1,cloud2,cloud3];
     cloud = myClouds[Math.floor(Math.random() * myClouds.length)];
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      //canvasContext.rotate(jumperX/20.0);
      canvasContext.drawImage(cloud,-PLATFORM_RADIUS,-PLATFORM_RADIUS,
        cloud.width, 
      cloud.height);
      canvasContext.restore();
    }
  }
  