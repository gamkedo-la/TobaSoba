var worldEditor = true;

function drawEditor(){
    if (worldEditor == false) {
        return;
    }
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = 'black';
    canvasContext.fillText("EDITOR MODE",250,35);
    console.log("we reached editor");
};

function drawTiles(){

};

function selectTile(){

};

function editorKeyCheck(keyCode) {
    if (worldEditor == false) {
        if(keyCode == KEY_TAB) {
            worldEditor = true;
            console.log('editor enabled');
            return;
        }
    }
    switch (keyCode) {
        case KEY_TAB:
            worldEditor = false;
            console.log('editor disabled');
            break;
    } 
}

function editLevel(){
   var currentLevel = JSON.parse(JSON.stringify(levelData))
    //newLevel.unshift(selectTiles());	
};


function generateLevel(){
var newLevel = JSON.parse(JSON.stringify(levelData)); // deep/clean copy since we'll modify it during loading
	//newLevel.unshift(editLevel);	
	return newLevel;
};
