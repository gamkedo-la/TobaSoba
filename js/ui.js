
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

function drawTrophyUI() {
    var showTrophyNum;
    showTrophyNum = trophyHeld;
    shadowText(showTrophyNum,trophy.width/1.5,120+trophy.height/2,'gold','25px Verdana','left');
    canvasContext.globalAlpha = 0.8;
    canvasContext.drawImage(trophy,0,120,
        trophy.width/1.5, 
        trophy.height/1.5);
}

function shadowText(txt,x,y,color='white',font='20px Verdana',align='center') {
    canvasContext.font = font;
    canvasContext.textAlign = align;
    canvasContext.fillStyle = 'black';
    canvasContext.fillText(txt,x+1,y+1);
    canvasContext.fillStyle = color;
    canvasContext.fillText(txt,x,y);
}

function generateGradientSprite(rgba1,x1,y1,rgba2,x2,y2,isVertical) {
    let can = document.createElement('canvas');
	let w = x2-x1;
	let h = y2-y1;
	can.width = w;
	can.height = h
	let ctx = can.getContext('2d');
	let grd = ctx.createLinearGradient(0,0,isVertical?0:w,isVertical?h:0);
	grd.addColorStop(0,rgba1);
	grd.addColorStop(1,rgba2);
	ctx.fillStyle = grd;
	ctx.fillRect(x1,y1,w,h);
	return can;
}

var menuBGimage;
function drawMenu() {

    if (!menuBGimage) menuBGimage = generateGradientSprite('rgba(0,0,0,1)',0,0,'rgba(0,0,0,0.5)',canvas.width,canvas.height,true);
    canvasContext.drawImage(menuBGimage,0,0);
    
    canvasContext.drawImage(menuPic,
        Math.round(canvas.width/2-menuPic.width/2), // horizontally centered
        0, //Math.round(canvas.height/2-menuPic.height/2) // vertically centered?
        );

    var menuX = Math.round(canvas.width/2);
    var menuY = menuPic.height;
    var menuLineHeight = 26;

    // centered
    shadowText("created by Vaan Hope Khani",menuX,menuY+=menuLineHeight);
    shadowText("Left right arrow keys to run",menuX,menuY+=menuLineHeight*2);
    shadowText("Up-arrow key or spacebar to jump",menuX,menuY+=menuLineHeight);
    // not centered
    shadowText("[P] Pause",menuX-50,menuY+=menuLineHeight*2,'silver','20px Verdana','left');
    shadowText("[C] Credits",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
    shadowText("[M] Menu",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
    shadowText("[K] Editor",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
    shadowText("[X] Music on/off",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
    shadowText("[1] House Level",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
    shadowText("[2] Nature Level",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
    shadowText("[3] Factory Level",menuX-50,menuY+=menuLineHeight,'silver','20px Verdana','left');
  }
  
  function gameOverScreen() {
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
  
    canvasContext.fillText("Press key P to play", INDENT, 320);
    canvasContext.fillText("Press key M for menu", INDENT, 360);
  }

  function drawPrologue() {
    colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'beige');
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = 'purple';
    canvasContext.fillText("I feel lonely and lost", INDENT, 80);
    canvasContext.fillText("Soba's not been around for a year already.", INDENT, 100);
    canvasContext.fillText("wait a minure!I hear a murrmuring voice. Maybe I'm going crazy. Whose voice is it?", INDENT, 140);
    canvasContext.fillText("HHHHe? Hlp? Hlp PLsss? ", INDENT, 180);
    canvasContext.fillText("Is that you Soba? Sounds like Soba but where could he be?", INDENT, 220);
    canvasContext.fillText("Oh, I guess it's coming from the Factory!", INDENT, 260);
    canvasContext.fillText("Maybe I should follow the voice but it's dangerous going there.", INDENT, 300);
    canvasContext.fillText("I should probably go there and see if Soba's in there", INDENT, 300);
  }
  
  function drawEpilogue() {
    colorRect(0, 0, canvas.width/1.5, canvas.height/1.5, 'beige');
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = 'purple';
    canvasContext.fillText("Finally defeated the angry robot! Now where did you hide Soba?", INDENT, 80);
    canvasContext.fillText("wait, I can see Soba's soul.Why was Soba in there?", INDENT, 100);
    canvasContext.fillText("Oh no, I destroyed the last remaining of Soba!", INDENT, 140);
    canvasContext.fillText("Hi Toba ", INDENT, 180);
    canvasContext.fillText("It's okay. I was imprisoned here", INDENT, 220);
    canvasContext.fillText("But I could save you", INDENT, 260);
    canvasContext.fillText("You freed me. That's enough for me.", INDENT, 300);
    canvasContext.fillText("Thank you Toba.", INDENT, 340);
  }
