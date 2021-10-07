function drawEnerrgyUI() {
    var pos=0;
    for (var i = 0; i<5; i++) {
        canvasContext.drawImage(snackEmpty,0,pos+=30,
            snackEmpty.width, 
            snackEmpty.height);
    }

    if (snackHeld<=5 && snackHeld>0) {
        pos=0;
        for (var i = 0; i<snackHeld; i++) {
            canvasContext.drawImage(snackFull,0,pos+=30,
                snackEmpty.width, 
                snackEmpty.height);
        } 
    }

}
