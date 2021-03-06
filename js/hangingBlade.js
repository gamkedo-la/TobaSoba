
const HANGINGBLADE_RADIUS = 25;
  function HangingBladeClass() {
    this.xb = 0;
    this.yb = 0;
    this.x = 0;
    this.y = 75;
    this.pendIncreasing = 0;
    this.swingAng = 0;
    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_HANGINGBLADE) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.xb = eachCol * TILE_W + TILE_W / 2;
            this.yb = eachRow * TILE_H;
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

        this.x= this.xb+Math.cos(this.swingAng)*50;
        this.y= this.yb+Math.sin(this.swingAng)*50;

    }
    this.playerCollide = function(){
        Jumper.bouncePlayer(this);
        Jumper.takeDamage();
        Jumper.playerDeath();

        if (jumperSpeedY > 0){
          jumperSpeedY = 0;
        }
      console.log("Player Hit");   
    }
     
    this.draw = function () {
      canvasContext.save();
      canvasContext.translate(this.xb,this.yb);
      canvasContext.rotate(this.swingAng);
      canvasContext.drawImage(hangingBlade,0,-HANGINGBLADE_RADIUS,
        hangingBlade.width, 
      hangingBlade.height);
      canvasContext.restore();
    }
  }
  