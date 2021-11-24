const KEY_0 = 48;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_A = 65;
const KEY_C = 67;
const KEY_D = 68;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_P = 80;
const KEY_R = 82;
const KEY_T = 84;
const KEY_W = 87;
const KEY_TAB = 9;
const KEY_CTRL = 17;
const KEY_PAGE_UP = 33;
const KEY_PAGE_DOWN = 34;

const KEY_TILDE = 192;
const KEY_PLUS = 61;
const KEY_MINUS = 173;

var holdLeft = false;
var holdRight = false;
var holdJump = false;

var radiusIncrease = false;
var radiusDecrease = false;

var wheelDir;
var mousePos;
var isMouseWheel = false;
var bMouseDown = false;
var prevEditedTileIndex = -1;
  
function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	document.addEventListener("mousedown", mouseClick);

	document.addEventListener("mouseup", function() {
		prevEditedTileIndex = -1;
		bMouseDown = false;
	});

	document.addEventListener("mousemove", 
		function(evt) {
			mousePos = calculateMousePos(evt);
			editLevel();
		});

		document.addEventListener("wheel", function(evt) {
			isMouseWheel = true;
			wheelDir = Math.sign(evt.deltaY);
		});
		
}

function setKeyHoldState(thisKey, setTo) {
	switch (thisKey) {
	case KEY_LEFT_ARROW:
	case KEY_A: 
		holdLeft = setTo;
		break;
	case KEY_RIGHT_ARROW:
	case KEY_D: 
		holdRight = setTo;
		break;
	case KEY_UP_ARROW:
	case KEY_SPACE:
	case KEY_W:
		holdJump = setTo;
		break;
	case KEY_K:
    worldEditor = true;
    console.log("World editor enabled");
    break;
	case KEY_L:
    worldEditor = false;
    console.log("World editor switched off");
    break;
	case KEY_PLUS:
		radiusIncrease = setTo;
		break;
	case KEY_MINUS:
		//TODO: Create delay?
		radiusDecrease = setTo;
		break;
	case KEY_M:
        if (setTo == false) {
            if (gameState == STATE_MENU) { // toggle on/off	
                gameState = STATE_PLAY;
            } else { 
                gameState = STATE_MENU;
            }
        }
		break;
	case KEY_P:
		if (setTo == false){
			togglePause();
		}
		break;
	case KEY_R:
		if (setTo == false){
			resetGame();
			paused = false;
		}
    break;
	case KEY_C:
		gameState = STATE_CREDITS;
		break;
	case KEY_T:
		jumperX = mousePos.x + cameraPanX;	
		jumperY = mousePos.y + cameraPanY;
		break
	case KEY_TILDE:
		if (setTo == false){
			showDebug = !showDebug;
		}
		break
	default:
		//console.log("Keycode is: " + thisKey);
	}
}

function mouseClick(evt){
	//backgroundMusic.startOrStopMusic();
	bMouseDown = true;
	editLevel();
}

function editLevel() {
	if (worldEditor) {	
		if (editorKeyCheck) {
			if (!(mousePos.x > 0 && mousePos.x < canvas.width) ||
				!(mousePos.y > 0 && mousePos.y < canvas.height)) {
				console.log("mouse off canvas");
				return;
			}

			tileIndex = getTileIndexAtPixelCoord(mousePos.x + cameraPanX, mousePos.y + cameraPanY);
		
			if(bMouseDown && prevEditedTileIndex != tileIndex) {
				prevEditedTileIndex = tileIndex;
				if (roomGrid[tileIndex] == TILE_WALL4) {
					roomGrid[tileIndex] = TILE_SKY;
				} else {
					roomGrid[tileIndex] = TILE_WALL4;
				}
			}
			//console.log(roomGrid[tileIndex]+ " " + tileIndex);
		}
		
		else {
			//console.log("World editor disabled - hit ` to start");
		}
			
	}
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left;
	var mouseY = evt.clientY - rect.top;
	return {
		x:mouseX,
		y:mouseY
	};
}

function keyPressed(evt) {
	editorKeyCheck(evt.keyCode);
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, false);
}