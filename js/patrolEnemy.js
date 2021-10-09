function PatrolEnemy (){

  this.x = 100;
  this.y = 100;
  this.speedX = 0;
  this.speedY = 0;
  this.runSpeed = 3;


  this.move = function(){
    if(this.moveLeft){
      this.speedX = -this.runSpeed;
    }
    if(this.moveRight){
      this.speedX = this.runSpeed;
    }
    this.speedX *= GROUND_FRICTION;
  }

  this.draw = function() {
    canvasContext.save();
    canvasContext.translate(this.x, this.y);
    canvasContext.rotate(this.x/20.0);
    canvasContext.drawImage(patrolEnemyPic,-JUMPER_RADIUS,-JUMPER_RADIUS,
    patrolEnemyPic.width, 
    patrolEnemyPic.height);
    canvasContext.restore();
  }
}