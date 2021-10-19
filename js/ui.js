function drawEnerrgyUI() {
    var pos=0;
    var showSnackNum;
    if(snackHeld<4) {
        showSnackNum = snackHeld;
    } else {
        showSnackNum = 4;
        snackHeld = 4;
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
