// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let zoomLevel = 1; // Zoom level to be used for canvas
let translate = {x:0, y:0}; // How much the canvas is shifted by in canvas coordinates


window.addEventListener("resize", refreshCanvas);

function refreshCanvas() {
    // Apparently these four lines only work in this function idk why
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    // Breaks if you call translate after scale for some reason
    ctx.translate(canvas.width/2 + translate.x, canvas.height/2 + translate.y); 
    ctx.scale(zoomLevel, -zoomLevel);

    // Draw a rectangle over the entire canvas
    ctx.clearRect(-(canvas.width/2 + translate.x) / zoomLevel, -(canvas.height/2 - translate.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);
}

canvas.addEventListener("wheel", zoom);

function zoom(event) {
    zoomLevel += event.deltaY * -0.002;
    zoomLevel = Math.min(Math.max(0.01, zoomLevel), 10); // Add a maximum and minimum value to the zoom
}

canvas.addEventListener("mousemove", pan);

function pan(event) {
    if (event.ctrlKey) {
        translate.x += event.movementX;
        translate.y += event.movementY;
    }
}