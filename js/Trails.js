// a simple trail renderer made by McFunkypants

// how to init:
// var trail = new trailsFX();
// then each frame:
// trail.draw(x,y); 

function trailsFX() {

    var width = 32; // size of trail 
    var num = 32; // how many to draw
    
    var i = 0; // reused
    var max = 0; // array size
    var alpha = 1; // opacity, reused
    var maxAlpha = 0.15; // starting opacity
    var offsetx = 0;
    var offsety = 0;

    // previous positions
    var xpos = [];
    var ypos = [];

    this.draw = function(x,y) {

        // remember new position
        xpos[max] = x;
        ypos[max] = y;
        max++;

        if (max<num) return; // wait for enough data

        alpha = 1; // start opaque
        
        // draw each line segment more faded out
        for (i=max-num+1; i<max; i++) {
            alpha -= 1/num;
            if (alpha<0) alpha = 0;
            canvasContext.beginPath();
            canvasContext.strokeStyle = "rgba(255,255,255,"+(maxAlpha*(1-alpha))+")";
            canvasContext.lineWidth = width * (1-alpha);
            canvasContext.moveTo(xpos[i-1]+offsetx,ypos[i-1]+offsety);
            canvasContext.lineTo(xpos[i]+offsetx,ypos[i]+offsety);
            canvasContext.stroke();
        }
        
    };
}