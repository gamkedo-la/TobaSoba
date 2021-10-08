console.log('Debug is connected')

var showDebug = true;

function drawDebug(){
  if (showDebug == false){
    return
  }

  var wasFont = canvasContext.font;
  canvasContext.font = "18px Verdana";

  var lineX = 1200;
  var lineY = 800;
  var skipY = 30;
  var fgColor = 'white';
  var bgColor = 'black';
  shadowText('Toggle debug menu on/off by pressing ~', lineX, lineY, fgColor, bgColor)
  lineY += skipY
  shadowText('jumpTimer: '+jumpTimer, lineX, lineY, fgColor, bgColor)
  lineY += skipY
  shadowText('doneJumping: '+doneJumping, lineX, lineY, fgColor, bgColor)
  lineY += skipY
  shadowText('currentGravity: '+currentGravity, lineX, lineY, fgColor, bgColor)

  canvasContext.font = wasFont;
}