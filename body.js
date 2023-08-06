let radius = 50;
let mass = 10**15;
let colour = "#71aff8";
let pos = {x:0, y:0};
let vel = {x:0, y:0};

canvas.addEventListener("mouseup", createBody);

function createBody(event) {
    new Body(radius, mass, colour, {x:(event.clientX - canvas.width/2 - translate.x) / zoomLevel, y:-(event.clientY - canvas.height/2 - translate.y) / zoomLevel}, {x:vel.x, y:vel.y});
    console.log(event.clientX, event.clientY);
}
