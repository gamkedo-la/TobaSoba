function patrolEnemy (){

  this.x = 100;
  this.y = 100;

  this.move = function(){

  }


this.draw = function() {
    canvasContext.save();
    canvasContext.translate(jumperX,jumperY);
    canvasContext.rotate(jumperX/20.0);
    canvasContext.drawImage(patrolEnemyPic,-JUMPER_RADIUS,-JUMPER_RADIUS,
    patrolEnemyPic.width, 
    patrolEnemyPic.height);
    canvasContext.restore();
  }
}