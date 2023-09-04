// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let overlayCanvas = document.getElementById("overlay-canvas"); // Canvas to be used by the drag indicator line
let overlayCtx = overlayCanvas.getContext("2d");

requestAnimationFrame(update);

function update() {
    refreshCanvas();
    calc();

    if (!settings._pause) {
        requestAnimationFrame(update);
    }
}


function refreshCanvas() {
    ctx.globalAlpha = settings.canvasOpacity;
    ctx.fillStyle = "black";
    // Draw a rectangle over the entire canvas
    ctx.fillRect(-(canvas.width/2 + translateLevel.x) / zoomLevel, -(canvas.height/2 - translateLevel.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);
    ctx.globalAlpha = 1;
}


function calc() {
    // Update values and redraw the bodies
    for (let body of bodies) {
        body.updateForce();
        body.updateAcc();
        body.updateVel();
        body.updatePos();
        body.draw();
    }

    // Change the previous and current position values to be identical after the force calculation (which is based on distance, and by extension position) to not intefere 
    for (let body of bodies) {
        body.updateCalcPos();
    }
}