// TODO: Make viewport controls work with pause and not move the bodies on screen
// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let zoomLevel = 0.01; // Zoom level to be used for canvas
let translateLevel = {x:0, y:0}; // How much the canvas is shifted by in canvas coordinates

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    // Breaks if you call translate after scale for some reason
    ctx.translate(canvas.width/2 + translateLevel.x, canvas.height/2 + translateLevel.y);
    ctx.scale(zoomLevel, -zoomLevel);
}

canvas.addEventListener("wheel", zoom);

function zoom(event) {
    zoomLevel += event.deltaY * -0.00005;
    zoomLevel = Math.min(Math.max(0.00001, zoomLevel), 0.5); // Add a maximum and minimum value to the zoom
    // Breaks if you call translate after scale for some reason
    ctx.translate(canvas.width/2 + translateLevel.x, canvas.height/2 + translateLevel.y);
    ctx.scale(zoomLevel, -zoomLevel);
}


canvas.addEventListener("mousemove", pan);

function pan(event) {
    if (event.ctrlKey) {
        translateLevel.x += event.movementX;
        translateLevel.y += event.movementY;
        resizeCanvas();
    }
}