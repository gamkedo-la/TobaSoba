const NATUREBOSS_RADIUS = 25;
const BOSS_RUN_SPEED = 2.5;
const BOSS_JUMP_POWER = 15;
  function NatureBossClass() {
    this.x = 75;
    this.y = 75;
    this.tailX = 75;
    this.tailY = 75;
    this.speedX = 0;
    this.speedY = 0;
   
    this.hitsLeft = 8;
    this.fallDelayFrames = 0;
    var natureBossWidth = 30;
    var natureBossHeight = 30;
    var framesPerSecond = 30;
    this.onGround = false;
    this.onnGroundLastFrame = false; // used to know if we just landed
    var previousFrameJumping = false;
    this.justBumpedWall = false; // this helps us not play the sound too often
    
    this.currentGravity = GRAVITY;
    

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_NATUREBOSS) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end foe for
      return false; // no more nature boss
    }

    this.move = function(){
    if (this.onGround) {
        this.speedX *= GROUND_FRICTION;
    } else {
        this.speedX *= AIR_RESISTANCE;
        if (this.fallDelayFrames > 0) {
            this.fallDelayFrames--;
        } else 
        {
           this.speedY += GRAVITY;  
        }
    
        if (this.speedY > NATUREBOSS_RADIUS) { // cheap test to ensure can't fall through floor
          this.speedY = NATUREBOSS_RADIUS; 
        }
    }


    if (this.x < jumperX) {
        this.speedX = BOSS_RUN_SPEED;
    }
    if (this.x > jumperX) {
        this.speedX = -BOSS_RUN_SPEED;
    }
    var jumpMargin = TILE_W*3;
    if (this.x > jumperX-jumpMargin && this.x < jumperX+jumpMargin && this.onGround) {
        this.speedY = -BOSS_JUMP_POWER ;
    }
    

      if (this.speedY < 0 && isBrickAtPixelCoord(this.x, this.y -NATUREBOSS_RADIUS) == 1) {
        // hit the ceiling
        this.y = (Math.floor(this.y / TILE_H)) * TILE_H + NATUREBOSS_RADIUS;
        this.speedY = 0.0;
    }

    if (this.speedY > 0 && isBrickAtPixelCoord(this.x, this.y + NATUREBOSS_RADIUS) == 1) {
        // hit the floor
        this.y = (1 + Math.floor(this.y / TILE_H)) * TILE_H - NATUREBOSS_RADIUS;
        if (!this.onGround) { // were we in the air last frame?
            //console.log("just landed on the floor!");
            groundSound.play(0.5); // thud
            particleFX(this.x, this.y + NATUREBOSS_RADIUS, 16, landingParticleRGBA,
                0.001,Math.random()*-2,landingParticleLifespan,landingParticlegravity,landingParticleRandomness);
        }
        this.onGround = true;
        this.speedY = 0;
    } else if (isBrickAtPixelCoord(this.x, this.y + NATUREBOSS_RADIUS + 2) == 0) {
        this.onGround = false;
    }

    if (this.speedX < 0 && isBrickAtPixelCoord(this.x - NATUREBOSS_RADIUS, this.y) == 1) {
        this.x = (Math.floor(this.x / TILE_W)) * TILE_W + NATUREBOSS_RADIUS;
        if (!this.justBumpedWall) {
            groundSound.play(0.1); // thud quietly and not too often
            this.justBumpedWall = true;
        }
    } else if (this.speedX > 0 && isBrickAtPixelCoord(this.x + NATUREBOSS_RADIUS, this.y) == 1) {
        this.x = (1 + Math.floor(jumperX / TILE_W)) * TILE_W - NATUREBOSS_RADIUS;
        if (!this.justBumpedWall) {
            this.justBumpedWall = true;
        }
    } else {
        this.justBumpedWall = false; 
    }
    this.moveInto();
  }
  
    this.moveInto = function() {
      if (dist(this.x - jumperX, this.y - jumperY) < 3*TILE_W) {
        var toPlayer = angTo(jumperX - this.x, jumperY - this.y);
        //this.xv =  Math.cos(toPlayer);
        //this.yv = Math.sin(toPlayer);
      }
      this.tailX = this.x - this.speedX*5;
      this.tailY = this.y - this.speedY*5;
      var nextX = this.speedX + this.x ;
      var nextY =  this.speedY + this.y;
      
      var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
      var walkIntoTileType =  roomForeground;
  
      if (walkIntoTileIndex != undefined) {
          walkIntoTileType = roomGrid[walkIntoTileIndex];
      }
      
      if(walkIntoTileType != roomForeground) {
        this.x = nextX;
        this.y = nextY;
       
      } else {
        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
      }
      var tailAng = Math.atan2(this.tailY-this.y, this.tailX-this.x);
      var tailCenterDist = NATUREBOSS_RADIUS+12;
      this.tailX = this.x+tailCenterDist*Math.cos(tailAng);
      this.tailY = this.y+tailCenterDist*Math.sin(tailAng);
      switch (walkIntoTileType) {
        case roomBackground:
            break;
      }
    }
      this.playerCollide = function(){
        if (this.y - jumperY < 0) {
          Jumper.takeDamage();
          Jumper.bouncePlayer(this);
          Jumper.playerDeath();
        } else { 
          this.hitsLeft--;
          if(this.hitsLeft == 0) {
            this.readyToRemove = true;
            enemyDeadSound.play();
          }
        }
     }
     
     
    this.draw = function () {
      drawBitmapCenteredAtLocationWithFlip(natureBossPic, this.x, this.y,this.speedX > 0);
      var tailAng = Math.atan2(this.tailY-this.y, this.tailX-this.x)+Math.PI*0.5;
      drawBitmapCenteredAtLocationWithRotation(natureBossTailPic, this.tailX, this.tailY,tailAng);
      
    }
  }
  