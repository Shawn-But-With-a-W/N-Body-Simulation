// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// Canvas to be used by the drag indicator line
let overlayCanvas = document.getElementById("overlay-canvas"); 
let overlayCtx = overlayCanvas.getContext("2d");

// Start recursion to animate the simulation
requestAnimationFrame(update);

function update() {
    refreshCanvas();
    calc();

    if (!settings._pause) {
        requestAnimationFrame(update); // Only updates when the simulation is not paused
    }
}

// Covers the canvas to make it ready for new bodies to be drawn
function refreshCanvas() {
    // Draw a translucent black rectangle over the entire canvas to create trails
    ctx.globalAlpha = settings.canvasOpacity;
    ctx.fillStyle = "black";
    ctx.fillRect(-(canvas.width/2 + translateLevel.x) / zoomLevel, -(canvas.height/2 - translateLevel.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);
    ctx.globalAlpha = 1; // Set back to no opacity for drawing bodies
}


// Updates values and draws each body in new position
function calc() {
    for (const body of bodies) {
        body.updateForce();
        body.updateAcc();
        body.updateVel();
        body.updatePos();
        body.draw();
    }

    // Update calculation position seperately to remove effects of order of udpate
    // i.e. bodies updated first will move, causing inaccuracies in distance calculations between earlier-updated and later-updated bodies
    for (const body of bodies) {
        body.updateCalcPos();
    }
}