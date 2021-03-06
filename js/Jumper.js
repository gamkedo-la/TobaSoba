const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;
const MAX_JUMP_DURATION_SECS = 0.5;
const POWER_UP_FRAME_DURATION = 120;
const PIPE_SPEED = 8;
const FRAMES_BETWEEN_SNACK_LOSS = 30;

var framesPerSecond = 30;
var jumperFallDelayFrames = 0;
var jumperInPipe = false;
var lastJumpedPipeIndexChangedBy = -1; // to tell enter/exit
var jumperX = 75, jumperY = 75;
var respawnX = 75, respawnY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperWidth = 30;
var jumperHeight = 30;
var jumperLeftSide = jumperX - jumperWidth/2;
var jumperTopSide = jumperY - jumperHeight/2;
var jumperCollisionBox = "green";
var jumperOnGround = false;
var jumperOnGroundLastFrame = false; // used to know if we just landed
var jumperHeldByClaw = null;
var JUMPER_RADIUS = 15;
var jumpTimer = 0.0;
var jumperPowerUpTime = POWER_UP_FRAME_DURATION;
var previousFrameJumping = false;
var doneJumping = false;
var justBumpedWall = false; // this helps us not play the sound too often
var playerBlinkFrames = 0; // when >1 the player sprite is blinking

var currentGravity = GRAVITY;
var gravityFallModifier = 2;

// a poof of dust when we land on the ground after jumping
const landingParticleRGBA = "rgba(255,255,255,0.25)";
const landingParticleLifespan = 0.75;
const landingParticlegravity = 0.15;
const landingParticleRandomness = 3; // speed variation

var holdLeft = false;
var holdRight = false;

var jumpVariables = [];
var jumpVariableNames = ["jumperRadius", "runSpeed", "jumperSpeedX", "jumpPower", "jumperSpeedY", "groundFriction", "airResistance", "gravity"];
var snackLossDelay = 0;
var trophyHeld = 0;

function respawnJumper() {
    paused = false;
    gameState = STATE_PLAY;
    Jumper.restoreSnacks();
    jumperX = respawnX;
    jumperY = respawnY;
    jumperSpeedX = jumperSpeedY = 0;
    snackLossDelay = 2 * FRAMES_BETWEEN_SNACK_LOSS; // extra safety buffer on respawn
    cameraInstantJump();
}

function JumperClass() {

    this.CollisionCheck = function(against){
        var jumperLeftSide = jumperX - jumperWidth/2;
        var jumperTopSide = jumperY - jumperHeight/2;
        if( against.x > jumperLeftSide &&
            against.x < jumperLeftSide + jumperWidth &&
            against.y > jumperTopSide &&
            against.y < jumperTopSide + jumperHeight){
            //console.log("Player Hit");
            jumperCollisionBox = "red";
            against.playerCollide();
            } else {
            jumperCollisionBox = "green";
            }
        
    }
    this.inSafePositionForCheckpoint = function() {
        var isSafe = true;
        if(jumperOnGround == false) { // never save position in air
            isSafe = false;
        }
        if(snackLossDelay > 0) { // never save position where recently hurt
            isSafe = false;
        }
        if(Math.abs((Math.floor(jumperX) % TILE_W)-25) > 15) { // near center of tile, so not leaning over an edge
            isSafe = false;
        }
        if(isBrickAtPixelCoord(jumperX,jumperY)) { // currently inside of a tile, not safe to respawn here
            isSafe = false;
        }
        if(isSafe) {
            var unsafeEnemyPixelDistanceForCheckpoint = 300;
            for (var i=0; i < enemyList.length; i++){
                var playerDist = dist(enemyList[i].x - jumperX, enemyList[i].y - jumperY);
                if(playerDist < unsafeEnemyPixelDistanceForCheckpoint) {
                    isSafe = false;
                    break;
                }
            }
        }
        return isSafe;
    }
    this.powerUpMode = function() {
        return snackHeld >= 5;
    }
    this.restoreSnacks = function() {
        if(snackHeld < 4) {
            snackHeld = 4;
        }
    }
    this.move = function() {
        if(this.inSafePositionForCheckpoint()) {
            respawnX = jumperX;
            respawnY = jumperY;
        }
        if(snackLossDelay>0) {
            snackLossDelay--;
        }

        if (jumperPowerUpTime > 0) {
            jumperPowerUpTime--;
            if (jumperPowerUpTime == 0 && this.powerUpMode()) {
                snackHeld = 4;
            }
        }
        if (jumperOnGround) {
            jumperSpeedX *= GROUND_FRICTION;
        } else {
            jumperSpeedX *= AIR_RESISTANCE;
            if (jumperFallDelayFrames > 0) {
                jumperFallDelayFrames--;
            } else 
            {
                jumperSpeedY += currentGravity;  
            }
        
            if (jumperSpeedY > JUMPER_RADIUS) { // cheap test to ensure can't fall through floor
                jumperSpeedY = JUMPER_RADIUS;
            }
        }

        if (jumperSpeedY > 0) {
            currentGravity = GRAVITY * gravityFallModifier;
        } else if (jumperOnGround) {
            currentGravity = GRAVITY;
        }

        if (holdLeft) {
            jumperSpeedX = -RUN_SPEED;
        }
        if (holdRight) {
            jumperSpeedX = RUN_SPEED;
        }

        if(holdJump && jumpTimer == 0) {
            jumpSound.play();
        }

        if (holdJump && jumpTimer <= MAX_JUMP_DURATION_SECS && !doneJumping) {
            jumperSpeedY = -JUMP_POWER;
            jumpTimer += 1 / framesPerSecond;
        }
        if (previousFrameJumping && !holdJump) {
            doneJumping = true;
        }

        previousFrameJumping = holdJump;

        if (jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX, jumperY - JUMPER_RADIUS) == 1) {
            // hit the ceiling
            jumperY = (Math.floor(jumperY / TILE_H)) * TILE_H + JUMPER_RADIUS;
            jumperSpeedY = 0.0;
        }

        if (jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX, jumperY + JUMPER_RADIUS) == 1) {
            // hit the floor
            jumperY = (1 + Math.floor(jumperY / TILE_H)) * TILE_H - JUMPER_RADIUS;
            if (!jumperOnGround) { // were we in the air last frame?
                //console.log("just landed on the floor!");
                groundSound.play(0.5); // thud
                particleFX(jumperX, jumperY + JUMPER_RADIUS, 16, landingParticleRGBA,
                    0.001,Math.random()*-2,landingParticleLifespan,landingParticlegravity,landingParticleRandomness);
                // when we hit the ground, we BLINK!
                playerBlinkFrames = 8;
            }
            jumperOnGround = true;
            jumperSpeedY = 0;
            jumpTimer = 0.0;
            doneJumping = false;
        } else if (isBrickAtPixelCoord(jumperX, jumperY + JUMPER_RADIUS + 2) == 0) {
            jumperOnGround = false;
        }

        if (jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX - JUMPER_RADIUS, jumperY) == 1) {
            jumperX = (Math.floor(jumperX / TILE_W)) * TILE_W + JUMPER_RADIUS;
            if (!justBumpedWall) {
                groundSound.play(0.1); // thud quietly and not too often
                justBumpedWall = true;
            }
        } else if (jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX + JUMPER_RADIUS, jumperY) == 1) {
            jumperX = (1 + Math.floor(jumperX / TILE_W)) * TILE_W - JUMPER_RADIUS;
            if (!justBumpedWall) {
                groundSound.play(0.1); // thud quietly and not too often
                justBumpedWall = true;
            }
        } else {
            justBumpedWall = false; 
        }

        if(isBrickAtPixelCoord(jumperX,jumperY)) { // currently inside of a wall somehow?
            this.stuckTime++;
            if(this.stuckTime>25) {
                respawnJumper();
            }
        } else {
            this.stuckTime=0;
        }
    }
    this.stuckTime=0;


    this.jumperReset = function() {
        // center jumper on screen
        jumperX = canvas.width / 2;
        jumperY = canvas.height / 2;
    }

    // key controls used for this
    this.setupControls = function(upKey, rightKey, downKey, leftKey) {
        this.controlKeyForUP = upKey;
        this.controlKeyForRIGHT = rightKey;
        this.controlKeyForDOWN = downKey;
        this.controlKeyForLEFT = leftKey;
    }

    this.init = function(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset();
    }

    this.reset = function() {
        //if(this.homeX == undefined) {
        for (var i = 0; i < roomGrid.length; i++) {
            if (roomGrid[i] == TILE_PLAYER) {
                var tileRow = Math.floor(i / ROOM_COLS);
                var tileCol = i % ROOM_COLS;
                this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
                this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
                if (worldEditor == false) {
                    roomGrid[i] = roomBackground;
                }
                respawnX = jumperX = this.homeX;
                respawnY = jumperY = this.homeY;
                break; // found it, so no need to keep searching 
            } // end of if
        } // end of for
        this.restoreSnacks();
    }
    
    this.moveInto = function() {
        var nextX = jumperX + jumperSpeedX;
        var nextY = jumperY + jumperSpeedY;
        var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL;

        if (walkIntoTileIndex != undefined) {
            walkIntoTileType = roomGrid[walkIntoTileIndex];
        }

        if (tileTypeHasWallCollision (walkIntoTileType) == false) {
            jumperX = nextX;
            jumperY = nextY;
        }
        var hadPowerUp;
        var nowHasPowerUp;
        //console.log(pipesTouchingIndex(walkIntoTileIndex));
        if (jumperInPipe) {
            if (lastJumpedPipeIndexChangedBy != walkIntoTileIndex &&
                pipesTouchingIndex(walkIntoTileIndex) == 0) {
                lastJumpedPipeIndexChangedBy = walkIntoTileIndex;
                jumperInPipe = false;
            }
        } else {
            if (lastJumpedPipeIndexChangedBy != walkIntoTileIndex &&
                pipesTouchingIndex(walkIntoTileIndex) == 1) {
                lastJumpedPipeIndexChangedBy = walkIntoTileIndex;
                jumperInPipe = true;
            }
        }
        switch (walkIntoTileType) {
            case TILE_SKY:
                break;
            case TILE_PIPEUP:
                if (jumperInPipe) {
                    jumperY-=PIPE_SPEED;
                    jumperX = TILE_W*Math.floor(jumperX/TILE_W)+TILE_W/2;
                    jumperSpeedX = 0;
                    jumperSpeedY = 0;
                }
                break;
            case TILE_PIPEDOWN:
                if (jumperInPipe) {
                    jumperY+=PIPE_SPEED;
                    jumperX = TILE_W*Math.floor(jumperX/TILE_W)+TILE_W/2;
                    jumperSpeedX = 0;
                    jumperSpeedY = 0;
                }
                break;
            case TILE_PIPELEFT:
                if (jumperInPipe) {
                    jumperX-=PIPE_SPEED;
                    jumperY = TILE_H*Math.floor(jumperY/TILE_H)+TILE_H/2;
                    jumperSpeedX = 0;
                    jumperSpeedY = 0;
                }
                break;
            case TILE_PIPERIGHT:
                if (jumperInPipe) {
                    jumperX+=PIPE_SPEED;
                    jumperY = TILE_H*Math.floor(jumperY/TILE_H)+TILE_H/2;
                    jumperSpeedX = 0;
                    jumperSpeedY = 0;
                }
                break;
            case TILE_ROLLLINE:
                if (jumperInPipe) {
                    jumperX+=PIPE_SPEED;
                    jumperY = TILE_H*Math.floor(jumperY/TILE_H);
                    jumperSpeedX = 0;
                    jumperSpeedY = 0;
                }
                break;
            case TILE_DOOR:
                doorSound.play();
                if (roomGridMaster) {
                    roomGrid[walkIntoTileIndex] = roomBackground; // remove door
                }
                if ( roomGridMaster == roomGridList[0]) {
                    loadLevel(1);
                    gameState = STATE_PLAY;
                    worldEditor = false;
                } else if ( roomGridMaster == roomGridList[1]) {
                    loadLevel(2);
                    backgroundMusic.loopSong("audio/toba_soba-ohno");
                    gameState = STATE_PLAY;
                    worldEditor = false;
                }
                break;
            case TILE_WALL:
                break;
            case TILE_PATROLENEMY:
            
                break;
            case TILE_SPRINGBOARD:
            
                break;
            default:
                // any other tile type number was found... do nothing, for now
                break;
        }
    }
    this.takeDamage = function() {
        if(!worldEditor){
            if(snackLossDelay > 0){
                return;
            } else {
                snackLossDelay = FRAMES_BETWEEN_SNACK_LOSS;
            }

            if (this.powerUpMode() == false) {
                hurtSound.play();
                snackHeld--;
            }
            if (snackHeld == 0){
                alarmSound.play();
            }
        }
    }
    this.playerDeath = function() {
        if (snackHeld < 0){
            deathSound.play();
            gameState = STATE_GAME_OVER;
            gameIsOver = true;
        }
    }
    this.bouncePlayer = function(against) {
        var dx = jumperX - against.x;
        var dy = jumperY - against.y;
        var angle = Math.atan2(dy,dx) + Math.PI;
        jumperSpeedX = Math.cos(angle)* JUMP_POWER * 2;
        jumperSpeedY = Math.sin(angle)* JUMP_POWER * 2;
    }
    this.Draw = function() {
        if(snackLossDelay > 0 && snackLossDelay%4<2) {
            return; // flash invulnerable frames
        }

        if (!this.trail) this.trail = new trailsFX(); // first time
        this.trail.draw(jumperX, jumperY); // every frame

        var playerImg;
        if(this.powerUpMode() == false) {

            if (playerBlinkFrames>0) { // currently blinking?
                playerImg =  playerBlinkingPic;
                playerBlinkFrames--;
            } else { // our eyes are open
                playerImg = playerPic;
                // but blink from time to time just for life
                if (Math.random()<0.02) {
                    playerBlinkFrames = 6;
                }
            }
            
        } else {
            playerImg =  playerPowerPic;
        }
        jumperLeftSide = jumperX - jumperWidth/2;
        jumperTopSide = jumperY - jumperHeight/2;

        canvasContext.save();
        canvasContext.translate(jumperX, jumperY);
        canvasContext.rotate(jumperX / 20.0);
        canvasContext.imageSmoothingEnabled = true;
        canvasContext.drawImage(playerImg , -JUMPER_RADIUS, -JUMPER_RADIUS,
            playerImg.width,
            playerImg.height);
        canvasContext.restore();

        if(showCollisionBoxes){
            colorRect(jumperLeftSide, jumperTopSide, jumperWidth, jumperHeight, jumperCollisionBox)
        }
    }
}