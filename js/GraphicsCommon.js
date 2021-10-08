function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
  
function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic, -graphic.w / 2, -graphic.height / 2);// center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function shadowText(text, atX, atY, foregroundColor, backgroundColor){
	canvasContext.fillStyle = backgroundColor;
	canvasContext.fillText(text, atX+2, atY+2)
	canvasContext.fillStyle = foregroundColor;
	canvasContext.fillText(text, atX, atY)
}
