var cameraPanX = 0;
var cameraPanY = 0;

function cameraPan() {
	var cameraRightBoundary = ROOM_COLS * TILE_W - canvas.width;
	var cameraBottomBoundary = ROOM_ROWS * TILE_H - canvas.height;
	var cameraPanXWas = cameraPanX;
	var cameraPanYWas = cameraPanY;
	cameraPanX = jumperX - canvas.width/2;
	cameraPanY = jumperY - canvas.height/2;
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
	canvasContext.save();
    canvasContext.translate(Math.floor(-cameraPanX), Math.floor(-cameraPanY));
}

function endCameraPan() {
    canvasContext.restore();
} 