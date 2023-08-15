canvas.addEventListener("mousedown", createBody);

function createBody(event) {
    new Body(settings.radius, settings.mass, settings.colour, {x : (event.clientX - canvas.width/2 - translateLevel.x) / zoomLevel, y : -(event.clientY - canvas.height/2 - translateLevel.y) / zoomLevel}, {x : settings.vel.x, y : settings.vel.y});
}