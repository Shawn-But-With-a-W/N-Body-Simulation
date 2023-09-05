let zoomLevel = 0.001; // Zoom level to be used for canvas
let translateLevel = {x:0, y:0}; // How much the canvas is shifted by in canvas coordinates


resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Resizes the canvas to fit viewport dimensions; applies camera zoom and pan on canvas
function resizeCanvas() {
    // Make the canvas fill up entire viewport
    canvas.height = overlayCanvas.height = window.innerHeight;
    canvas.width = overlayCanvas.width = window.innerWidth;

    // Change canvas to cartesian standards
    ctx.translate(canvas.width/2 + translateLevel.x, canvas.height/2 + translateLevel.y);
    ctx.scale(zoomLevel, -zoomLevel);
    
    // Ensure only updating canvas, not updating bodies' positions when paused
    if (settings._pause) {
        refreshCanvas();
        for (const body of bodies) {
            body.draw();
        }
    }
}


window.addEventListener("wheel", zoom);

// Zooms in/out on canvas
function zoom(event) {
    zoomLevel += event.deltaY * -(settings.scrollMultiplier);
    zoomLevel = Math.min(Math.max(0.0001, zoomLevel), 0.01); // Add a maximum and minimum value to the zoom

    resizeCanvas();
}


window.addEventListener("mousemove", pan);

// Pans the camera (i.e. shifts the canvas)
function pan(event) {
    if (event.ctrlKey) {
        translateLevel.x += event.movementX;

        // Change direction of panning if invert y is turned on
        if (!settings._invertY) {
            translateLevel.y += event.movementY;
        }
        else {
            translateLevel.y -= event.movementY;
        }

        resizeCanvas();
    }
}