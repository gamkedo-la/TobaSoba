var jumperEnemyList = [];

function addJumperEnemy(){
	var tempJumperEnemy = new JumperEnemyClass();
	jumperEnemyList.push(tempJumperEnemy);
}

function JumperEnemyClass (){
  this.x = 100;
  this.y = 100;
  this.timeToJumpIn = 100;
  this.width = 30;
  this.height = 30;
  this.speedX = 0;
  this.speedY = 0;
  this.runSpeed = 0.5;
  this.moveLeft = true;
  this.moveRight = false;
  this.collisionBox = "green"
  this.onGround = true;
  this.jumperOnGroundLastFrame = false; // used to know if we just landed
  this.radius = 15;
  this.jump = false;
  this.jumpTimer = 0.0;
  this.previousFrameJumping = false;
  this.doneJumping = false;
  this.fallDelayFrames = 0;
  this.timeToMove = true;
  this.timerForTimeToMove = 1000;
  this.timePeriodForMoving = 1100;
  
  this.init = function(whichGraphic, whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }

  this.reset = function() {
    for (var i = 0; i < roomGrid.length; i++) {
        if (roomGrid[i] == TILE_JUMPINGENEMY) {
            var tileRow = Math.floor(i / ROOM_COLS);
            var tileCol = i % ROOM_COLS;
            this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
            this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
          //  if (!worldEditor) {      //Vince:  This will need a work around.  It is preventing Enemy's from erasing their tile upon initiation.  10/20/2021
                roomGrid[i] = TILE_GROUND;
            //}
            this.x = this.homeX;
            this.y = this.homeY;
            break; 
        } 
    } 
  } 

  this.move = function(){

    this.timerForTimeToMove++;

    if(this.timerForTimeToMove > this.timePeriodForMoving){
      this.timerForTimeToMove = 0;
      this.timePeriodForMoving = getRndInteger(100, 200);
      let decisionToChangeTimeToMoveBoleen = getRndInteger(1,3);
      if(decisionToChangeTimeToMoveBoleen == 1){
        this.timeToMove = true;
        this.moveLeft = true;
        this.moveRight = false;
      } else if (decisionToChangeTimeToMoveBoleen == 2){
        this.timeToMove = true;
        this.moveRight = true;
        this.moveLeft = false;
      } else {
        this.timeToMove = false;
      }
    }

    if(!this.timeToMove){
      this.moveLeft = false;
      this.moveRight = false;
    } 

    if (this.onGround) {
        this.speedX *= GROUND_FRICTION;
        this.timeToJumpIn++;
    } else {
        this.speedX *= AIR_RESISTANCE;
        this.speedY += currentGravity;
        this.timeToJumpIn = 0;
        if (this.speedY > JUMPER_RADIUS) { 
            this.speedY = JUMPER_RADIUS;
        }
    }

    if (jumperSpeedY > 0) {
        currentGravity = GRAVITY * gravityFallModifier;
    } else if (jumperOnGround) {
        currentGravity = GRAVITY;
    }

    if(this.timeToJumpIn > 200){
        this.jump = true;
    }

    if (this.fallDelayFrames > 0) {
        this.fallDelayFrames--;
    } else {
        jumperSpeedY += currentGravity;  
    }

    if (this.jump && this.jumpTimer <= MAX_JUMP_DURATION_SECS && !this.doneJumping) {
        this.speedY = -JUMP_POWER;
        this.jumpTimer += 1 / framesPerSecond;
    }
    if (this.previousFrameJumping && !this.jump) {
        this.doneJumping = true;
    }

    this.previousFrameJumping = holdJump;

    if(this.moveLeft){
      this.speedX = -this.runSpeed;
      this.moveRight = false;
    }
    if(this.moveRight){
      this.speedX = this.runSpeed;
      this.moveLeft = false;
    }
    this.speedX *= GROUND_FRICTION;
    this.moveInto();
    this.x += this.speedX
  }

  this.moveInto = function() { //Vince:  This can be refactored into a parent class with the Jumper 10/20/2021
    let nextX, nextY;
    nextY = this.y + this.speedY;
    if(this.moveLeft){
      nextX = this.x + this.speedX - this.width/2;
    }
    if(this.moveRight){
      nextX = this.x + this.speedX + this.width/2;
    }
    
    
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
   // var walkIntoTileType = TILE_WALL;

    if (walkIntoTileIndex != undefined) {
        walkIntoTileType = roomGrid[walkIntoTileIndex];
    }

    switch (walkIntoTileType) {
        case TILE_GROUND:
        case TILE_TREASURE:
        case TILE_SNACK:
          this.x = nextX;
          this.y = nextY;
            break;
        case TILE_DOOR:
        case TILE_WALL:
          this.changeDirection();
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

this.changeDirection = function(){
  if(this.moveLeft){ //change from Left to Right motion
    this.moveLeft = false;
    this.moveRight = true;
  } else { //change from right to left motion
    this.moveLeft = true;
    this.moveRight = false;
  }
}

  this.draw = function() {
    canvasContext.save();
    canvasContext.translate(this.x, this.y);
    canvasContext.rotate(this.x/20.0);
    canvasContext.drawImage(this.myBitmap,-JUMPER_RADIUS,-JUMPER_RADIUS, this.width, this.height);
    canvasContext.restore();
  }
}
