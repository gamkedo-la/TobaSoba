
const HANGINGBLADE_RADIUS = 25;
  function HangingBladeClass() {
    this.x = 0;
    this.y = 0;
    this.xe = 0;
    this.ye = 75;
    this.pendIncreasing = 0;
    this.swingAng = 0;
    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_HANGINGBLADE) {
            roomGrid[arrayIndex] = TILE_GROUND;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end of row for
      return false; // no more blade
    }
    this.move = function(){
      this.pendIncreasing++; // global or class scope for persistence
      var baseAng = Math.PI/2; // might be -, but offset for which way is down
      var speedMod = 0.15;
      var swingRange = Math.PI/4;
      this.swingAng = baseAng + Math.cos(this.pendIncreasing*speedMod)*swingRange;

        this.xe= this.x+Math.cos(this.swingAng)*50;
        this.ye= this.y+Math.sin(this.swingAng)*50;

    }
    this.playerCollide = function(){
        bouncePlayer();
        takeDamage();
        playerDeath();

        if (jumperSpeedY > 0){
          jumperSpeedY = 0;
        }
      console.log("Player Hit");   
    }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.x,this.y);
      canvasContext.rotate(this.swingAng);
      canvasContext.drawImage(hangingBlade,0,-HANGINGBLADE_RADIUS,
        hangingBlade.width, 
      hangingBlade.height);
      canvasContext.restore();
    }
  }
  