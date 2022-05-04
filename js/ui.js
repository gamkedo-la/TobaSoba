
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
    shadowText(showTrophyNum,50+trophy.width/1.5,0+trophy.height/2,'gold','25px Verdana','left');
    canvasContext.globalAlpha = 0.8;
    canvasContext.drawImage(trophy,50,0,
        trophy.width/1.5, 
        trophy.height/1.5);
    canvasContext.globalAlpha = 1.0;
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

    if (!menuBGimage) menuBGimage = generateGradientSprite('rgba(245,245,220,1)',0,0,'rgba(245,245,220,0.5)',canvas.width,canvas.height,true);
    canvasContext.drawImage(menuBGimage,0,0,menuBGimage.width,menuBGimage.height,
                                        0,0,canvas.width,canvas.height);
    
    var logoScale = 0.4;
    canvasContext.drawImage(menuPic,
        0,0,
        menuPic.width,menuPic.height,
        0,0,
        logoScale*menuPic.width,logoScale*menuPic.height
        );

    var menuX = 40;
    var menuY = menuPic.height*logoScale+20;
    var menuLineHeight = 26;
    var menuFontColor = '#777';
    shadowText("[M] Toggle Menu",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[1] House Level Warp",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[2] Nature Level Warp",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[3] Factory Level Warp",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[R] Respawn to Safety",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[X] Music on/off",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[Q] Toggle MiniMap",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[P] Toggle Pause",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    shadowText("[C] Show Credits",menuX,menuY+=menuLineHeight,menuFontColor,'20px Verdana','left');
    menuY+=menuLineHeight; // skip extra line
    shadowText("Left/right arrow keys to run",menuX,menuY+=menuLineHeight,'purple','20px Verdana','left');
    shadowText("Up-arrow key or spacebar to jump",menuX,menuY+=menuLineHeight,'purple','20px Verdana','left');
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
    colorText("PRESS R TO RESPAWN",canvas.width/2, canvas.height/2 + 40, 34, "cyan");
  }

  var creditsSize = 16;

  function drawCredits() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.fillStyle = 'orange';
  
    var lineX = 13;
    var lineY = 1;
    var lineSkip = creditsSize+5;
    canvasContext.font = creditsSize+"px Helvetica";
    for(var i=0;i<creditsList.length;i++) {
        canvasContext.fillText(creditsList[i], INDENT, lineY+=lineSkip);
    }
  
    //canvasContext.fillText("Press SPACE or ENTER to play", INDENT, 450);
    canvasContext.fillText("Press M for menu", INDENT, 470);
  }

  var showLineCounter = 0;
  const framesBetweenStoryText = 30;
  function drawPrologue() {
    canvasContext.font = "19px Verdana";
    var speaker1Color = "purple";
    var speaker2Color = "orange";
    var lineX = 305;
    var lineY = 25;
    var lineSkip = 30;
    var storySet = [
    "(feeling lonely and lost)",
    "Soba's not been around for a few years! I wonder where he's been.",
    "Wait a minute! I hear a murmuring voice. Whose voice is it?",
    "Help? Help please!?", // color 2
    "Is that you Soba? Sounds like Soba but where could he be?",
    "Help please!?", // color 2
    "Oh, I guess it's coming from the Factory!",
    "I think I should follow the voice but it's dangerous going there.",
    "I must go and see if Soba's in there"
    ];

    showLineCounter++;
    var nextLine = Math.floor(showLineCounter/framesBetweenStoryText);
    for(var i=0;i<storySet.length;i++) {
        canvasContext.fillStyle = (i==3 || i==5 ? speaker2Color : speaker1Color);
        if(i==nextLine) {
            canvasContext.globalAlpha = (showLineCounter%framesBetweenStoryText)/framesBetweenStoryText;
        } else {
            canvasContext.globalAlpha = 1.0;
        }

        canvasContext.fillText(storySet[i], lineX+ INDENT * (i==3 || i==5 ? 1 : 0), lineY+=lineSkip);
        if(i+1>nextLine) {
            break;
        }
    }
    canvasContext.globalAlpha = 1.0;
    
    /*canvasContext.fillStyle = "black";
    canvasContext.fillText("Press SPACE or ENTER to Play", INDENT, 460);
    canvasContext.fillText("Press M for Menu", INDENT, 490);
    canvasContext.fillText("Press C for Credits", INDENT, 520);*/
  }
  
  function drawEpilogue() {
    colorRect(0, 0, canvas.width, canvas.height, 'beige');
    canvasContext.font = "25px Verdana";
    var speaker1Color = "purple";
    var speaker2Color = "orange";
    var lineY = 60;
    var lineSkip = 40;
    var storySet = [
    "Finally defeated the angry robot! Now where did you hide Soba?",
    "Wait, I can hear Soba's voice. Is that Soba's soul?",
    "Oh no, I destroyed the last remaining of Soba!",
    "Thank you Soba, you saved me.", // color 2
    "Is that really you? But I didn't save you, I erased you.",
    "No, You saved me Toba. I was imprisoned here for a long time.",
    "Take care. Be safe my friend.",
    ];

    showLineCounter++;
    var nextLine = Math.floor(showLineCounter/framesBetweenStoryText);
    for(var i=0;i<storySet.length;i++) {
        canvasContext.fillStyle = (i==3 || i==5 ? speaker2Color : speaker1Color);
        if(i==nextLine) {
            canvasContext.globalAlpha = (showLineCounter%framesBetweenStoryText)/framesBetweenStoryText;
        } else {
            canvasContext.globalAlpha = 1.0;
        }
    
        canvasContext.fillText(storySet[i], INDENT * (i==3 || i==5 ? 2 : 1), lineY+=lineSkip);
        if(i+1>nextLine) {
            break;
        }
    }
    canvasContext.globalAlpha = 1.0;
    
    canvasContext.fillStyle = "black";
    canvasContext.fillText("Press C for Credits", INDENT, 490);
  }

var creditsList = [
"Vaan Hope Khani: Project lead, core gameplay, level design, level editor, snack system, player character, traps, assorted sounds, collisions, moving platform, springboard, flying enemy, bosses, boost camera, game over screen, boost pad, map scrolling, minimap, story integration",
"Vince McKeown: Patrol enemy (functionality and art), jumper enemy, randomized enemy movement, waterfall animation",
"Patrick McKeown: State machine, credits view, level warp keys, additional music, mute toggle, UI adjustments",
"Philip Greene: Trees art (pine, oak, tall), cloud tiles, pipes and connectors, lifter claw art",
"Klaim (A. Joël Lamotte): Music, music integration and toggle, minor bug fix, playtesting",
"Farah R: Teleport function for testing, text shadow effect, debug panel",
"Abhishek @akhmin_ak: Background story, factory level box art, pick-up sound, pause functionality",
"Christer \"McFunkypants\" Kaitila: Particles, landing effects, sound mixing, menu, blink, trail, sky background",
"Filipe Dottori: Door art, player bounces off enemies, air movement tuning, limits on jump height",
"Vivek S: Jump sound fix, scrollbar css",
"H Trayford: Editor mode interface tweak",
"Chris DeLeon: Tunnel bug fix, camera improvements, nature boss face",
" ",
"Developed by members in HomeTeamGameDev.com - come make games with us!",
];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 100;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      /*const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }

        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else*/ if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(0, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function