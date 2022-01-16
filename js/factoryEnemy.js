const FACTORYENEMY_RADIUS = 25;
const IRON_RUN_SPEED = 2.5;
const IRON_JUMP_POWER = 15;

const FIRE_RADIUS = 10;
const FIRE_SPEED = 3.5;
const FIRE_RELOAD_FRAMES = 120;

function FactoryFireClass(startX, startY, startAng) {
  this.x = startX;
  this.y = startY;
  this.ang = startAng;
  this.move = function() {
    this.x += Math.cos(this.ang)*FIRE_SPEED;
    this.y += Math.sin(this.ang)*FIRE_SPEED;
    if(isBrickAtPixelCoord(this.x, this.y)) {
      this.readyToRemove = true;
    }
  }
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation(factoryFirePic, this.x, this.y,this.ang);
  }
  this.playerCollide = function(){
   this.readyToRemove = true;
   Jumper.takeDamage();
   Jumper.bouncePlayer(this);
   Jumper.playerDeath();
 }
}
  function FactoryEnemyClass() {
    this.x = 75;
    this.y = 75;
    this.fireAng = 0;
    this.fireX = 75;
    this.fireY = 75;
    this.speedX = 0;
    this.speedY = 0;
    this.phase = 0;
    this.fireX1= 0;
    this.fireY1= 0;
    this.fireX2= 0;
    this.fireY2= 0;
    this.fireDelay = 0;
    this.fireNext = true;
    this.fallDelayFrames = 0;
    this.onGround = false;
    this.onnGroundLastFrame = false; // used to know if we just landed
    this.justBumpedWall = false; // this helps us not play the sound too often
    
    this.currentGravity = GRAVITY;
    


    this.reset = function () {

      for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
          var arrayIndex = roomTileToIndex(eachCol, eachRow);
          if (roomGrid[arrayIndex] == TILE_FACTORYENEMY) {
            roomGrid[arrayIndex] = roomBackground;
            // this.ang = -Math.PI / 2;
            this.x = eachCol * TILE_W + TILE_W / 2;
            this.y = eachRow * TILE_H + TILE_H / 2;
            return true; //we found one 
          } //end of player start if
        } // end of col for
      } // end foe for
      return false; // no more nature enemy
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
    
        if (this.speedY > FACTORYENEMY_RADIUS) { // cheap test to ensure can't fall through floor
          this.speedY = FACTORYENEMY_RADIUS; 
        }
    }


    if (this.x < jumperX) {
        this.speedX = IRON_RUN_SPEED;
    }
    if (this.x > jumperX) {
        this.speedX = -IRON_RUN_SPEED;
    }
    if (this.phase == 1) {
      if (this.y < jumperY) {
          this.speedY = IRON_RUN_SPEED;
      }
      if (this.y > jumperY) {
          this.speedY = -IRON_RUN_SPEED;
      }
    }
    var jumpMargin = TILE_W*3;
    if (this.x > jumperX-jumpMargin && this.x < jumperX+jumpMargin && this.onGround) {
       // this.speedY = -IRON_JUMP_POWER ;
    }
    

      if (this.speedY < 0 && isBrickAtPixelCoord(this.x, this.y -FACTORYENEMY_RADIUS) == 1) {
        // hit the ceiling
        this.y = (Math.floor(this.y / TILE_H)) * TILE_H + FACTORYENEMY_RADIUS;
        this.speedY = 0.0;
    }

    if (this.speedY > 0 && isBrickAtPixelCoord(this.x, this.y + FACTORYENEMY_RADIUS) == 1) {
        // hit the floor
        this.y = (1 + Math.floor(this.y / TILE_H)) * TILE_H - FACTORYENEMY_RADIUS;
        if (!this.onGround) { // were we in the air last frame?
            //console.log("just landed on the floor!");
            groundSound.play(0.5); // thud
            particleFX(this.x, this.y + FACTORYENEMY_RADIUS, 16, landingParticleRGBA,
                0.001,Math.random()*-2,landingParticleLifespan,landingParticlegravity,landingParticleRandomness);
        }
        this.onGround = true;
        this.speedY = 0;
    } else if (isBrickAtPixelCoord(this.x, this.y + FACTORYENEMY_RADIUS + 2) == 0) {
        this.onGround = false;
    }

    if (this.speedX < 0 && isBrickAtPixelCoord(this.x - FACTORYENEMY_RADIUS, this.y) == 1) {
        this.x = (Math.floor(this.x / TILE_W)) * TILE_W + FACTORYENEMY_RADIUS;
        if (!this.justBumpedWall) {
            groundSound.play(0.1); // thud quietly and not too often
            this.justBumpedWall = true;
        }
    } else if (this.speedX > 0 && isBrickAtPixelCoord(this.x + FACTORYENEMY_RADIUS, this.y) == 1) {
        this.x = (1 + Math.floor(this.x / TILE_W)) * TILE_W - FACTORYENEMY_RADIUS;
        if (!this.justBumpedWall) {
            this.justBumpedWall = true;
        }
    } else {
        this.justBumpedWall = false; 
    }
    this.moveInto();

    if(this.fireDelay-- < 0){
      this.fireDelay = FIRE_RELOAD_FRAMES;
      var newFire;
      if (this.fireNext) {
        newFire = new FactoryFireClass(this.fireX, this.fireY,this.firAng);
      } else {
        newFire = new FactoryFireClass(this.fireX, this.fireY,this.fireAng);
      }
      this.fireNext = !this.fireNext;
      enemyList.push(newFire);
    }
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
      var shoulderRadius = FACTORYENEMY_RADIUS - 6;
      this.shoulderX1 = this.x-shoulderRadius;
      this.shoulderX2 = this.x+shoulderRadius;
      this.shoulderY1 = this.y+10;
      this.shoulderY2 = this.shoulderY1;
      this.fireAng = Math.atan2(jumperY - this.shoulderY1, jumperX - this.shoulderX1);
      this.fireX = this.shoulderX1+FIRE_RADIUS*Math.cos(this.fireAng);
      this.fireY = this.shoulderY1+FIRE_RADIUS*Math.sin(this.fireAng);
      switch (walkIntoTileType) {
        case roomBackground:
            break;
        case TILE_SNACK:
            this.x = nextX;
            this.y = nextY;
            break;
      }
    }

    this.playerCollide = function(){
      jumpTimer = 0;
      doneJumping = false;
      if (this.y - jumperY < 0) {
        Jumper.takeDamage();
        Jumper.bouncePlayer(this);
        Jumper.playerDeath();
      } else{ 
        this.readyToRemove = true;
        enemyDeadSound.play();
      }
    }
     
     
    this.draw = function () {
      drawBitmapCenteredAtLocationWithFlip(factoryEnemyPic, this.x, this.y,this.speedX > 0);
      var drawBoth = this.fireDelay < FIRE_RELOAD_FRAMES* 0.5;
      if (this.fireNext || drawBoth) {
        drawBitmapCenteredAtLocationWithRotation(factoryFirePic, this.fireX, this.fireY,this.fireAng);
      }
     
      
    }
  }

  