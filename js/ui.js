
function drawEnerrgyUI() {
    var pos=0;
    var showSnackNum;
    if(snackHeld<4) {
        showSnackNum = snackHeld;
    } else {
        showSnackNum = 4;
    }
    for (var i = 0; i<4; i++) {
        canvasContext.drawImage(snackEmpty,0,pos+i*30,
            snackEmpty.width, 
            snackEmpty.height);
    }

        
        for (var i = 0; i<showSnackNum; i++) {
            pos=0
            canvasContext.drawImage(snackFull,0,pos+i*30,
                snackEmpty.width, 
                snackEmpty.height);
        } 

}

function drawMenu() {
    colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'black');
    canvasContext.fillStyle = 'yellow';
    canvasContext.font = "50px Verdana";
    canvasContext.fillText("TobaSoba", INDENT-4, 80);
    canvasContext.font = "30px Verdana";
    canvasContext.fillText("created by Vaan Hope Khani", INDENT, 120);
    canvasContext.fillText("Left right arrow keys to run", INDENT, 200); 
    canvasContext.fillText("Up-arrow key or spacebar to jump", INDENT, 240);
    canvasContext.fillText("Press key P to play game", INDENT, 340);
    canvasContext.fillText("Press key C to view the Credits", INDENT, 380);
    canvasContext.fillText("Press key M to return here", INDENT, 420);
    canvasContext.fillText("Press L to leave editor, K to edit", INDENT, 480);
  }
  
  function gameOverScreen() {
    paused = true;
    var gameOverBoxWidth = 500;
    var gameOverBoxHeight = 200;
    canvasContext.globalAlpha = 0.3;
    colorRect(  canvas.width/2 - gameOverBoxWidth/2, 
        canvas.height/2 - gameOverBoxHeight/2, 
        gameOverBoxWidth,
        gameOverBoxHeight, 
        'lavender');
        canvasContext.globalAlpha = 1.0;
        canvasContext.textAlign = "center";
        canvasContext.font = "30px Verdana";
        canvasContext.fillStyle = 'orange';
        colorText("LETS TRY AGAIN",canvas.width/2, canvas.height/2 , 18, "green");
        colorText("PRESS R TO PLAY",canvas.width/2, canvas.height/2 + INDENT, 34, "cyan");
  }

  function drawCredits() {
    colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'black');
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = 'orange';
    canvasContext.fillText("TobaSoba made at HomeTeam GameDev", INDENT, 80);
  
    canvasContext.fillText("Vaan Hope Khani", INDENT, 140);
  
    canvasContext.fillText("Press key P to play", INDENT, 420);
    canvasContext.fillText("Press key M for menu", INDENT, 460);
  }
  
