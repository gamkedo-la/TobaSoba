function drawEditor(){

};

function drawTiles(){

};

function selectTile(){

};



function editLevel(){
   var currentLevel = JSON.parse(JSON.stringify(levelData))
    //newLevel.unshift(selectTiles());	
};


function generateLevel(){
var newLevel = JSON.parse(JSON.stringify(levelData)); // deep/clean copy since we'll modify it during loading
	//newLevel.unshift(editLevel);	
	return newLevel;
};
