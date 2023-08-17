let settings = {
    radius : 50,
    mass : 10**15,
    colour : "#71aff8",
    pos : {x:0, y:0},
    vel : {x:0, y:0},
    G : 0.0000000000667428, // Gravitational constant, used in calculation of force
    t : 1, // Time interval between consecutive calculations
    softening : 500, // Used to prevent the denominator in GMm/r^2 from going to 0 and producing infinite force
    trail : 4,
    CanvasOpacity : 1/4,
    intervalDelay : 10,
    _pause : false // *Changed to true to save power when testing, remember to change back
};


syncNum();
// Set each input field to match the slider
function syncNum() {
    document.getElementById("radius-num").value = document.getElementById("radius-slider").value;
    document.getElementById("mass-num").value = document.getElementById("mass-slider").value;
    document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
    document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
    document.getElementById("t-num").value = document.getElementById("t-slider").value;
    document.getElementById("softening-num").value = document.getElementById("softening-slider").value;
    document.getElementById("trail-num").value = document.getElementById("trail-slider").value;
    document.getElementById("interval-num").value = document.getElementById("interval-slider").value;

    syncSettings();
}

// Set each slider to match the input field
function syncSlider() {
    document.getElementById("radius-slider").value = document.getElementById("radius-num").value;
    document.getElementById("mass-slider").value = document.getElementById("mass-num").value;
    document.getElementById("x-vel-slider").value = document.getElementById("x-vel-num").value;
    document.getElementById("y-vel-slider").value = document.getElementById("y-vel-num").value;
    document.getElementById("t-slider").value = document.getElementById("t-num").value;
    document.getElementById("softening-slider").value = document.getElementById("softening-num").value;
    document.getElementById("trail-slider").value = document.getElementById("trail-num").value;
    document.getElementById("interval-slider").value = document.getElementById("interval-num").value;

    syncSettings();
}

// Sync values of the settings record to be the same to the input panel's
function syncSettings() {
    settings.radius = parseFloat(document.getElementById("radius-num").value);
    settings.mass = parseFloat(document.getElementById("mass-num").value);
    settings.colour = "#" + document.getElementById("colour-hex").value;
    settings.pos.x = parseFloat(document.getElementById("x-pos-num").value);
    settings.pos.y = parseFloat(document.getElementById("y-pos-num").value);
    settings.vel.x = parseFloat(document.getElementById("x-vel-num").value);
    settings.vel.y = parseFloat(document.getElementById("y-vel-num").value);
    settings.G = parseFloat(document.getElementById("G").value);
    settings.t = parseFloat(document.getElementById("t-num").value);
    settings.softening = parseFloat(document.getElementById("softening-num").value);
    settings.trail = parseFloat(document.getElementById("trail-num").value);
    settings.CanvasOpacity = 1 / settings.trail;
    settings.intervalDelay = parseFloat(document.getElementById("interval-num").value);
}


// TODO: Add drag functionality
// Creating bodies on mouse click
canvas.addEventListener("mousedown", createBodyMouse);

function createBodyMouse(event) {
    new Body(settings.radius, settings.mass, settings.colour, {x : (event.clientX - canvas.width/2 - translateLevel.x) / zoomLevel, y : -(event.clientY - canvas.height/2 - translateLevel.y) / zoomLevel}, {x : settings.vel.x, y : settings.vel.y});
}


// Pause functionality
pauseButton = document.getElementById("pause")
function pause() {
    if (settings._pause) {
        interval = setInterval(update, settings.intervalDelay);
        settings._pause = false;
        pauseButton.innerText = "Pause";
    }
    else {
        clearInterval(interval);
        settings._pause = true;
        pauseButton.innerText = "Resume";
    }
}
