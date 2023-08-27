let zoomLevel = 0.001; // Zoom level to be used for canvas
let translateLevel = {x:0, y:0}; // How much the canvas is shifted by in canvas coordinates


resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.height = overlayCanvas.height = window.innerHeight;
    canvas.width = overlayCanvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    // Breaks if you call translate after scale for some reason
    ctx.translate(canvas.width/2 + translateLevel.x, canvas.height/2 + translateLevel.y);
    ctx.scale(zoomLevel, -zoomLevel);
    
    // Manually update the canvas if paused
    if (settings._pause) {
        refreshCanvas();
        for (let body of bodies) {
            body.draw();
        }
    }
}

window.addEventListener("wheel", zoom);

function zoom(event) {
    zoomLevel += event.deltaY * -0.0000001;
    zoomLevel = Math.min(Math.max(0.000001, zoomLevel), 0.5); // Add a maximum and minimum value to the zoom
    resizeCanvas();
}


window.addEventListener("mousemove", pan);

function pan(event) {
    if (event.ctrlKey) {
        translateLevel.x += event.movementX;
        translateLevel.y += event.movementY;
        resizeCanvas();
    }
}