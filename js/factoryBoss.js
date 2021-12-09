const FACTORYBOSS_RADIUS = 25;
  function FactoryBossClass() {
    this.x = 75;
    this.y = 75;
    this.xv = 1;
    this.yv = 0.5;
    this.speedX = 0;
    this.speedY = 0;
   
    this.fallDelayFrames = 0;
    var factoryBossWidth = 30;
    var factoryBossHeight = 30;
    var framesPerSecond = 30;
    var jumperCollisionBox = "green";
    this.onGround = false;
    this.onnGroundLastFrame = false; // used to know if we just landed
    var jumpTimer = 0.0;
    this.powerUpTime = POWER_UP_FRAME_DURATION;
    var previousFrameJumping = false;
    this.doneJumping = false;
    this.justBumpedWall = false; // this helps us not play the sound too often
    
    this.currentGravity = GRAVITY;
    this.gravityFallModifier = 2;
    
    this.CollisionCheck = function(against){
      var jumperLeftSide = jumperX - factoryBossWidth/2;
      var jumperTopSide = jumperY -  factoryBossHeight/2;
      if( against.x > jumperLeftSide &&
          against.x < jumperLeftSide + factoryBossWidth &&
          against.y > jumperTopSide &&
          against.y < jumperTopSide +  factoryBossHeight){
          //console.log("Player Hit");
          jumperCollisionBox = "red";
          against.playerCollide();
          } else {
          jumperCollisionBox = "green";
          }
      
  }

    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_FACTORYBOSS) {
            roomGrid[arrayIndex] = TILE_ROOF;
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
      if (this.PowerUpTime > 0) {
        this.PowerUpTime--;
    }
    if (this.onGround) {
        this.speedX *= GROUND_FRICTION;
    } else {
        this.speedX *= AIR_RESISTANCE;
        if (this.fallDelayFrames > 0) {
            this.fallDelayFrames--;
        } else 
        {
           this.speedY += this.currentGravity;  
        }
    
        if (this.speedY > FACTORYBOSS_RADIUS) { // cheap test to ensure can't fall through floor
          this.speedY = FACTORYBOSS_RADIUS; 
        }
    }

    if (jumperSpeedY > 0) {
        this.currentGravity = GRAVITY * this.gravityFallModifier;
    } else if (this.onGround) {
        this.currentGravity = GRAVITY;
    }

    if (this.x < jumperX) {
        this.speedX = -RUN_SPEED;
    }
    if (this.x > jumperX) {
        this.speedX = RUN_SPEED;
    }

    if (this.x > jumperX && this.x < jumperX && jumpTimer <= MAX_JUMP_DURATION_SECS && !this.doneJumping) {
        this.speedY = -JUMP_POWER;
        this.jumpTimer += 1 / framesPerSecond;
    }
    if (previousFrameJumping && jumperSpeedY==0) {
        this.doneJumping = true;
    }

      if (this.speedY < 0 && isBrickAtPixelCoord(this.x, this.y -FACTORYBOSS_RADIUS) == 1) {
        // hit the ceiling
        this.y = (Math.floor(this.y / TILE_H)) * TILE_H + FACTORYBOSS_RADIUS;
        this.speedY = 0.0;
    }

    if (this.speedY > 0 && isBrickAtPixelCoord(this.x, this.y + JUMPER_RADIUS) == 1) {
        // hit the floor
        this.y = (1 + Math.floor(this.y / TILE_H)) * TILE_H - FACTORYBOSS_RADIUS;
        if (!this.onGround) { // were we in the air last frame?
            //console.log("just landed on the floor!");
            groundSound.play(0.5); // thud
            particleFX(this.x, this.y + FACTORYBOSS_RADIUS, 16, landingParticleRGBA,
                0.001,Math.random()*-2,landingParticleLifespan,landingParticlegravity,landingParticleRandomness);
            // when we hit the ground, we BLINK!
            playerBlinkFrames = 8;
        }
        this.onGround = true;
        this.speedY = 0;
        this.jumpTimer = 0.0;
        this.doneJumping = false;
    } else if (isBrickAtPixelCoord(this.x, this.y + FACTORYBOSS_RADIUS + 2) == 0) {
        this.onGround = false;
    }

    if (this.speedX < 0 && isBrickAtPixelCoord(this.x - FACTORYBOSS_RADIUS, this.y) == 1) {
        this.x = (Math.floor(this.x / TILE_W)) * TILE_W + FACTORYBOSS_RADIUS;
        if (!this.justBumpedWall) {
            groundSound.play(0.1); // thud quietly and not too often
            this.justBumpedWall = true;
        }
    } else if (this.speedX > 0 && isBrickAtPixelCoord(this.x + FACTORYBOSS_RADIUS, this.y) == 1) {
        this.x = (1 + Math.floor(jumperX / TILE_W)) * TILE_W - FACTORYBOSS_RADIUS;
        if (!this.justBumpedWall) {
            groundSound.play(0.1); // thud quietly and not too often
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
        this.xv =  Math.cos(toPlayer);
        this.yv = Math.sin(toPlayer);
      }
      var nextX = this.xv - this.x ;
      var nextY =  this.yv - this.x;
      
      var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
      var walkIntoTileType =  TILE_WALL5;
  
      if (walkIntoTileIndex != undefined) {
          walkIntoTileType = roomGrid[walkIntoTileIndex];
      }
      
      if(walkIntoTileType != TILE_WALL) {
        this.x = nextX;
        this.y = nextY;
       
      } else {
        this.xv = -this.xv;
        this.yv = -this.yv;
      }
  console.log(this.x);
  
      switch (walkIntoTileType) {
        case TILE_SKY:
            break;
      }
    }
      this.playerCollide = function(){
        // [TODO] fix jump height, make jump slightly when not holding space
        jumpTimer = 0;
        doneJumping = false;
        if (this.y >= JUMP_POWER * Math.cos(.06)) {
          Jumper.takeDamage();
          Jumper.bouncePlayer();
          Jumper.playerDeath();
      }
     }
     
     
    this.draw = function () {
      drawBitmapCenteredAtLocationWithRotation(factoryBossPic, this.x, this.y,this.xv > 0);
    }
  }
  