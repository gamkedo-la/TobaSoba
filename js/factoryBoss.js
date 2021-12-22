const FACTORYBOSS_RADIUS = 25;
const ARM_RADIUS = 10;
const ROBO_RUN_SPEED = 2.5;
const ROBO_JUMP_POWER = 15;
  function FactoryBossClass() {
        this.x = 75;
        this.y = 75;
        this.armAng = 0;
        this.arm2Ang = 0;
        this.armX = 75;
        this.armY = 75;
        this.arm2X = 35;
        this.arm2Y = 35;
        this.speedX = 0;
        this.speedY = 0;
        this.phase = 0;
        this.shoulderX1= 0;
        this.shoulderY1= 0;
        this.shoulderX2= 0;
        this.shoulderY2= 0;
        this.fallDelayFrames = 0;
        var factoryBossWidth = 30;
        var factoryBossHeight = 30;
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
        if (this.onGround) {
            this.speedX *= GROUND_FRICTION;
        } else if (this.phase == 0){
            this.speedX *= AIR_RESISTANCE;
            if (this.fallDelayFrames > 0) {
                this.fallDelayFrames--;
            } else 
            {
               this.speedY += GRAVITY;  
            }
        
            if (this.speedY > FACTORYBOSS_RADIUS) { // cheap test to ensure can't fall through floor
              this.speedY = FACTORYBOSS_RADIUS; 
            }
        }
    
    
        if (this.x < jumperX) {
            this.speedX = ROBO_RUN_SPEED;
        }
        if (this.x > jumperX) {
            this.speedX = -ROBO_RUN_SPEED;
        }
        if (this.phase == 1) {
          if (this.y < jumperY) {
              this.speedY = ROBO_RUN_SPEED;
          }
          if (this.y > jumperY) {
              this.speedY = -ROBO_RUN_SPEED;
          }
        }
        var jumpMargin = TILE_W*3;
        if (this.x > jumperX-jumpMargin && this.x < jumperX+jumpMargin && this.onGround) {
           // this.speedY = -ROBO_JUMP_POWER ;
        }
        
    
          if (this.speedY < 0 && isBrickAtPixelCoord(this.x, this.y -FACTORYBOSS_RADIUS) == 1) {
            // hit the ceiling
            this.y = (Math.floor(this.y / TILE_H)) * TILE_H + FACTORYBOSS_RADIUS;
            this.speedY = 0.0;
        }
    
        if (this.speedY > 0 && isBrickAtPixelCoord(this.x, this.y + FACTORYBOSS_RADIUS) == 1) {
            // hit the floor
            this.y = (1 + Math.floor(this.y / TILE_H)) * TILE_H - FACTORYBOSS_RADIUS;
            if (!this.onGround) { // were we in the air last frame?
                //console.log("just landed on the floor!");
                groundSound.play(0.5); // thud
                particleFX(this.x, this.y + FACTORYBOSS_RADIUS, 16, landingParticleRGBA,
                    0.001,Math.random()*-2,landingParticleLifespan,landingParticlegravity,landingParticleRandomness);
            }
            this.onGround = true;
            this.speedY = 0;
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
          var nextX = this.speedX + this.x ;
          var nextY =  this.speedY + this.y;
          
          var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
          var walkIntoTileType =  TILE_WALL5;
      
          if (walkIntoTileIndex != undefined) {
              walkIntoTileType = roomGrid[walkIntoTileIndex];
          }
          
          if(walkIntoTileType != TILE_WALL5) {
            this.x = nextX;
            this.y = nextY;
           
          } else {
            this.speedX = -this.speedX;
            this.speedY = -this.speedY;
          }
          var shoulderRadius = FACTORYBOSS_RADIUS - 6;
          this.shoulderX1 = this.x-shoulderRadius;
          this.shoulderX2 = this.x+shoulderRadius;
          this.shoulderY1 = this.y+10;
          this.shoulderY2 = this.shoulderY1;
          this.armAng = Math.atan2(jumperY - this.shoulderY1, jumperX - this.shoulderX1);
          this.arm2Ang = Math.atan2(jumperY - this.shoulderY2, jumperX - this.shoulderX2);;
          this.armX = this.shoulderX1+ARM_RADIUS*Math.cos(this.armAng);
          this.armY = this.shoulderY1+ARM_RADIUS*Math.sin(this.armAng);
          this.arm2X = this.shoulderX2+ARM_RADIUS*Math.cos(this.arm2Ang);
          this.arm2Y = this.shoulderY2+ARM_RADIUS*Math.sin(this.arm2Ang);
          switch (walkIntoTileType) {
            case TILE_ROOF:
                break;
          }
        }
          this.playerCollide = function(){
            if (this.y - jumperY < 0) {
              Jumper.takeDamage();
              Jumper.bouncePlayer(this);
              Jumper.playerDeath();
              console.log("Player Hit");   
          } else {
            this.phase = 1;
            console.log("FAC BOOSS HURT");
          }
         }
         
         
        this.draw = function () {
          drawBitmapCenteredAtLocationWithFlip(factoryBossPic, this.x, this.y,this.speedX > 0);
          drawBitmapCenteredAtLocationWithRotation(factoryBossArmPic, this.armX, this.armY,this.armAng);
          drawBitmapCenteredAtLocationWithRotation(factoryBossArmPic, this.arm2X, this.arm2Y,this.arm2Ang);
          
        }
      }
      
  