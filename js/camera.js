var cameraPanX = 0;
var cameraPanY = 0;
var zoomLevel = 1.5;

function cameraInstantJump() {
	cameraPanX = (jumperX - canvas.width/2);
	cameraPanY = (jumperY - canvas.height/2);
	if(Jumper.trail) Jumper.trail.reset(); // don't show player teleport
	cameraEnforceBounds();
}

function cameraEnforceBounds() {
	var cameraRightBoundary = ROOM_COLS * TILE_W - canvas.width;
	var cameraBottomBoundary = ROOM_ROWS * TILE_H - canvas.height + 50;
	if (cameraPanX < 0) {
		cameraPanX = 0;
	}
	if (cameraPanX > cameraRightBoundary) {
		cameraPanX = cameraRightBoundary;
	}
	if (cameraPanY < 0) {
		cameraPanY = 0;
	}
	if (cameraPanY > cameraBottomBoundary) {
		cameraPanY = cameraBottomBoundary;
	}
}


function cameraPan() {
	var cameraPanXWas = cameraPanX;
	var cameraPanYWas = cameraPanY;
	//cameraPanX = (jumperX - canvas.width/2);
	//cameraPanY = (jumperY - canvas.height/2);
	var cameraSmooth = 0.05;
	var cameraSmoothInverse = 1.0-cameraSmooth;
	cameraPanX = (jumperX - canvas.width/2) * cameraSmooth + cameraPanX *cameraSmoothInverse;
	cameraPanY = (jumperY - canvas.height/2) * cameraSmooth + cameraPanY *cameraSmoothInverse;
	cameraEnforceBounds();

	canvasContext.save();
    canvasContext.translate(Math.floor(-cameraPanX), Math.floor(-cameraPanY));
	if (!worldEditor) {
		canvasContext.translate(Math.floor(jumperX), Math.floor(jumperY));
		canvasContext.scale(zoomLevel, zoomLevel);
		canvasContext.translate(Math.floor(-jumperX), Math.floor(-jumperY));
	}
}

function endCameraPan() {
    canvasContext.restore();
} 