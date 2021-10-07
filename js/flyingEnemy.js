function drawflyingEnemy() {
    canvasContext.save();
    canvasContext.translate(jumperX,jumperY);
    canvasContext.rotate(jumperX/20.0);
    canvasContext.drawImage(flyingEnemyPic,-JUMPER_RADIUS,-JUMPER_RADIUS,
    flyingEnemyPic.width, 
    flyingEnemyPic.height);
    canvasContext.restore();
  }
  