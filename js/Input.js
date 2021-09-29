const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_A = 65;
const KEY_D = 68;
const KEY_W = 87;
const KEY_TAB = 9;

const KEY_TILDE = 192;
const KEY_PLUS = 61;
const KEY_MINUS = 173;

var holdLeft = false;
var holdRight = false;
var holdJump = false;

var radiusIncrease = false;
var radiusDecrease = false;


var mousePos;
  
function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	document.addEventListener("mousedown", mouseClick);
	document.addEventListener("mousemove", 
		function(evt) {
		mousePos = calculateMousePos(evt);
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
	case KEY_TILDE:
		worldEditor = true;
		console.log("World editor enabled");
		break;
	case KEY_PLUS:
		radiusIncrease = setTo;
		break;
	case KEY_MINUS:
		//TODO: Create delay?
		radiusDecrease = setTo;
		break;
	default:
		//console.log("Keycode is: " + thisKey);
	}
}

function mouseClick(evt){
	//backgroundMusic.startOrStopMusic();
	if (worldEditor) {
		if (!(mousePos.x > 0 && mousePos.x < canvas.width) ||
			!(mousePos.y > 0 && mousePos.y < canvas.height)) {
			console.log("mouse off canvas");
			return;
		}

		tileIndex = getTileIndexAtPixelCoord(mousePos.x + cameraPanX, mousePos.y + cameraPanY);

		if (roomGrid[tileIndex] == 1) {
			roomGrid[tileIndex] = 0;
		} else {
			roomGrid[tileIndex] = 1;
		}
		console.log(roomGrid[tileIndex]+ " " + tileIndex);
	} else {
		//console.log("World editor disabled - hit ` to start");
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