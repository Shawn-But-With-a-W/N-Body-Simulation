// Stop right click context menu from appearing on canvas
overlayCanvas.addEventListener('contextmenu', event => event.preventDefault());

// Record of all values of input panel
let settings = {
    radius : 10 * 1000, // (m)
    mass : 1000 * (10 ** 18), // (kg)
    colour : "#71aff8",
    pos : {x:0, y:0}, // (m), from origin
    vel : {x:0, y:0}, // (m)
    trail : 15,
    canvasOpacity : 1/15, // Dependant on trail
    t : 1, // (s)
    G : 0.0000000000667428, // Gravitational constant (m^3 kg^-2 s^-2)
    softening : 10 * 1000, // (m)
    velCap : 20 * 1000, // (m/s)
    scrollMultiplier : 5 * (10 ** -7),
    dragMultiplier : 25,
    dragWidth : 2, // (px)
    dragColour : "#7a71f8",

    // Flags
    _hud : true,
    _bodyCount : true,
    _pause : false,
    _invertY : false,
    _sliders : true,
};


// Obtaining the value of inputs

syncNum();
// Set each input field to match the slider
function syncNum() {
    if (settings._sliders) {
        document.getElementById("radius-num").value = document.getElementById("radius-slider").value;
        document.getElementById("mass-num").value = document.getElementById("mass-slider").value;
        document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
        document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
        document.getElementById("trail-num").value = document.getElementById("trail-slider").value;
        document.getElementById("t-num").value = document.getElementById("t-slider").value;
        document.getElementById("softening-num").value = document.getElementById("softening-slider").value;
        document.getElementById("vel-cap-num").value = document.getElementById("vel-cap-slider").value;
        document.getElementById("scroll-mult-num").value = document.getElementById("scroll-mult-slider").value;
        document.getElementById("drag-mult-num").value = document.getElementById("drag-mult-slider").value;
        document.getElementById("drag-width-num").value = document.getElementById("drag-width-slider").value;
    }

    syncSettings();
}

// Set each slider to match the input field
function syncSlider() {
    if (settings._sliders) {
        document.getElementById("radius-slider").value = document.getElementById("radius-num").value;
        document.getElementById("mass-slider").value = document.getElementById("mass-num").value;
        document.getElementById("x-vel-slider").value = document.getElementById("x-vel-num").value;
        document.getElementById("y-vel-slider").value = document.getElementById("y-vel-num").value;
        document.getElementById("trail-slider").value = document.getElementById("trail-num").value;
        document.getElementById("t-slider").value = document.getElementById("t-num").value;
        document.getElementById("softening-slider").value = document.getElementById("softening-num").value;
        document.getElementById("vel-cap-slider").value = document.getElementById("vel-cap-num").value;
        document.getElementById("scroll-mult-slider").value = document.getElementById("scroll-mult-num").value;
        document.getElementById("drag-mult-slider").value = document.getElementById("drag-mult-num").value;
        document.getElementById("drag-width-slider").value = document.getElementById("drag-width-num").value;
    }

    syncSettings();
}

// Convert units and store values of inputs in 'settings' record
function syncSettings() {
    settings.radius = parseFloat(document.getElementById("radius-num").value) * 1000;
    settings.mass = parseFloat(document.getElementById("mass-num").value) * (10 ** 18);
    settings.colour = document.getElementById("colour").value;
    settings.pos.x = parseFloat(document.getElementById("x-pos-num").value) * 1000;
    settings.pos.y = parseFloat(document.getElementById("y-pos-num").value) * 1000;
    settings.vel.x = parseFloat(document.getElementById("x-vel-num").value) * 1000;
    settings.vel.y = parseFloat(document.getElementById("y-vel-num").value) * 1000;
    settings.trail = parseFloat(document.getElementById("trail-num").value);

    if (settings.trail > 1) {
        settings.canvasOpacity = 1 / settings.trail;
    }
    else {
        settings.canvasOpacity = 1;
    }

    settings.t = parseFloat(document.getElementById("t-num").value);
    settings.G = parseFloat(document.getElementById("G").value);

    settings.softening = parseFloat(document.getElementById("softening-num").value) * 1000;

    // Change minimum and maximum values of velocity slider depending on velocity cap
    if (settings._sliders) {
        if (document.getElementById("vel-cap-num").value != settings.velCap) {
            document.getElementById("x-vel-slider").min = -settings.velCap/1000;
            document.getElementById("x-vel-slider").max = settings.velCap/1000;
            document.getElementById("y-vel-slider").min = -settings.velCap/1000;
            document.getElementById("y-vel-slider").max = settings.velCap/1000;
    
            // Sync number to slider
            document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
            document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
        }
    }

    settings.velCap = parseFloat(document.getElementById("vel-cap-num").value) * 1000;
    settings.scrollMultiplier = parseFloat(document.getElementById("scroll-mult-num").value) * (10 ** -7);
    settings.dragMultiplier = parseFloat(document.getElementById("drag-mult-num").value);
    settings.dragWidth = parseInt(document.getElementById("drag-width-num").value);
    settings.dragColour = document.getElementById("drag-colour").value;
}


// Collapsing and expanding dropdowns

visibility = {
    body : true,
    general : true,
    advanced : false
};

document.getElementById("body-dropdown").addEventListener("click", collapseBody);
document.getElementById("general-dropdown").addEventListener("click", collapseGeneral);
document.getElementById("advanced-dropdown").addEventListener("click", collapseAdvanced);

function collapseBody() {
    if (visibility.body) {
        visibility.body = false;
        document.getElementById("body-settings").style.display = "none";
        document.getElementById("body-icon").innerText = "expand_more";
    }
    else {
        visibility.body = true;
        document.getElementById("body-settings").style.display = "block";
        document.getElementById("body-icon").innerText = "expand_less";
    }
}

function collapseGeneral() {
    if (visibility.general) {
        visibility.general = false;
        document.getElementById("general-settings").style.display = "none";
        document.getElementById("general-icon").innerText = "expand_more";
    }
    else {
        visibility.general = true;
        document.getElementById("general-settings").style.display = "block";
        document.getElementById("general-icon").innerText = "expand_less";
    }
}

function collapseAdvanced() {
    if (visibility.advanced) {
        visibility.advanced = false;
        document.getElementById("advanced-settings").style.display = "none";
        document.getElementById("advanced-icon").innerText = "expand_more";
    }
    else {
        visibility.advanced = true;
        document.getElementById("advanced-settings").style.display = "block";
        document.getElementById("advanced-icon").innerText = "expand_less";
    }
}


// Create bodies when the add body button is clicked
function createBodyButton() {
    new Body(
        settings.radius, 
        settings.mass, 
        settings.colour, 
        {
            x:settings.pos.x, 
            y:settings.pos.y
        }, 
        {
            x:settings.vel.x, 
            y:settings.vel.y
        }
    );
}


// Create bodies on mouse click
overlayCanvas.addEventListener("mousedown", startDrag);
overlayCanvas.addEventListener("mousemove", drag);
overlayCanvas.addEventListener("mouseup", createBodyMouse);

let _drag = false;
let initialPos = {};
let finalPos = {};
let dragVel = {};

function startDrag(event) {
    _drag = true;
    initialPos = {x : event.clientX, y : event.clientY};
    finalPos = {x : initialPos.x, y : initialPos.y};
    dragVel = {x : 0, y : 0};

}

function drag(event) {
    if (_drag) {
        finalPos = {x : event.clientX, y : event.clientY}

        // Drawing the drag indicator
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height); // Cover up last frame's drag indicator
        overlayCtx.strokeStyle = settings.dragColour;
        overlayCtx.lineWidth = settings.dragWidth;

        overlayCtx.beginPath();
        overlayCtx.moveTo(initialPos.x, initialPos.y);
        overlayCtx.lineTo(finalPos.x, finalPos.y);
        overlayCtx.stroke();
        overlayCtx.closePath();
        
    }
}

function createBodyMouse() {
    _drag = false;
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height); // Remove the drag indicator

    dragVel.x = (finalPos.x - initialPos.x) * settings.dragMultiplier;
    dragVel.y = -(finalPos.y - initialPos.y) * settings.dragMultiplier; // Negative since the default canvas has its y-axis inverted

    new Body(
        settings.radius, 
        settings.mass, 
        settings.colour, 
        {
            x : (initialPos.x - canvas.width/2 - translateLevel.x) / zoomLevel, 
            y : -(initialPos.y - canvas.height/2 - translateLevel.y) / zoomLevel // Convert from default canvas coordinates to panned and zoomed cartesian coordinates
        }, 
        {
            x : dragVel.x, 
            y : dragVel.y
        }
    );
}


// Pause

// Get button
const pauseButton = document.getElementById("pause");

function pause() {
    if (settings._pause) {
        settings._pause = false;
        requestAnimationFrame(update); // Starts the simulation again by calling a recursive function
    }
    else {
        settings._pause = true;
    }
}


// Remove all bodies

function remove() {
    bodies = [];

    // Covering up the canvas so no previous trails remain
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillRect(-(canvas.width/2 + translateLevel.x) / zoomLevel, -(canvas.height/2 - translateLevel.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);

    document.getElementById("body-count").innerText = "0 bodies";
}


// Reset slider/input values

function resetBody() {
    settings.radius = 10 * (10 ** 3);
    document.getElementById("radius-slider").value = document.getElementById("radius-num").value = 10;
    settings.mass = 1000 * (10 ** 18);
    document.getElementById("mass-slider").value = document.getElementById("mass-num").value = 1000;
    settings.colour = document.getElementById("colour").value = "#71aff8";
    settings.pos = {x:0, y:0};
    document.getElementById("x-pos-num").value = document.getElementById("y-pos-num").value = 0;
    settings.vel = {x:0, y:0};
    document.getElementById("x-vel-slider").value = document.getElementById("x-vel-num").value = document.getElementById("y-vel-slider").value = document.getElementById("y-vel-num").value = 0;
}

function resetGeneral() {
    settings.trail = document.getElementById("trail-slider").value = document.getElementById("trail-num").value = 15;
    settings.canvasOpacity = 1/15;
    settings.t = document.getElementById("t-slider").value = document.getElementById("t-num").value = 1; 
}

function resetAdvanced() {
    settings.G = 0.0000000000667428;
    document.getElementById("G").value = "0.0000000000667428";
    settings.softening = 10 * (10 ** 3);
     document.getElementById("softening-slider").value = document.getElementById("softening-num").value = 10;
    settings.velCap = 20 * (10 ** 3);
    document.getElementById("vel-cap-slider").value = document.getElementById("vel-cap-num").value = 20;
    settings.scrollMultiplier = 5 * (10 ** -7);
    document.getElementById("scroll-mult-slider").value = document.getElementById("scroll-mult-num").value = 5;
    settings.dragMultiplier = document.getElementById("drag-mult-slider").value = document.getElementById("drag-mult-num").value = 25;
    settings.dragWidth = document.getElementById("drag-width-slider").value = document.getElementById("drag-width-num").value = 2;
    settings.dragColour = document.getElementById("drag-colour").value = "#7a71f8";
}

function resetAll() {
    resetBody();
    resetGeneral();
    resetAdvanced();
}


// Reset camera

function resetZoom() {
    zoomLevel = 0.001;
    resizeCanvas();
}

function resetPan() {
    translateLevel = {x:0, y:0};
    resizeCanvas();
}


// Disable/Enable sliders

// Get elements
const sliderButton = document.getElementById("disable-sliders");
const sliders = document.getElementsByClassName("slider");
const sliderNums = document.getElementsByClassName("slider-num");

function disableSliders() {
    if (settings._sliders) {
        settings._sliders = false;
        sliderButton.innerText = "Sliders: DISABLED";
        for (const slider of sliders) {
            slider.style.display = "none"; // Hide all sliders
        }
        for (const sliderNum of sliderNums) {
            sliderNum.style.width = "18.3vw" // Set all inputs to be maximum width
        }
    }

    else {
        settings._sliders = true;
        sliderButton.innerText = "Sliders: ENABLED";
        for (const slider of sliders) {
            slider.style.display = "inline-block"; // Show all sliders
        }
        for (const sliderNum of sliderNums) {
            sliderNum.style.width = "5vw" // Set all inputs next to sliders to be normal width
        }
    }
}


// Invert y

// Get button
const invertButton = document.getElementById("invert-y");

function invertY() {
    if (settings._invertY) {
        settings._invertY = false;
        invertButton.innerText = "Invert Y: OFF";
    }
    else {
        settings._invertY = true;
        invertButton.innerText = "Invert Y: ON";
    }
}

// Show/Hide HUD

// Get elements
const hudButton = document.getElementById("display-hud");
const hud = document.getElementById("hud");

function displayHud() {
    if (settings._hud) {
        settings._hud = false;
        hudButton.innerText = "HUD: HIDDEN";
        hud.style.display = "none";
    }
    else {
        settings._hud = true;
        hudButton.innerText = "HUD: SHOWN";
        hud.style.display = "block";
    }
}

// Show/Hide body count

// Get elements
const bodyCountButton = document.getElementById("display-body-count");
const bodyCount = document.getElementById("body-count");

function displayBodyCount() {
    if (settings._bodyCount) {
        settings._bodyCount = false;
        bodyCountButton.innerText = "Body Count: HIDDEN";
        bodyCount.style.display = "none";
    }
    else {
        settings._bodyCount = true;
        bodyCountButton.innerText = "Body Count: SHOWN";
        bodyCount.style.display = "block";
    }
}


// Clearing all settings

function reset() {
    // Reset numerical and slider inputs
    resetAll();

    // Reset camera settings
    zoomLevel = 0.001;
    translateLevel = {x:0, y:0};
    resizeCanvas();

    // Reset flags

    if (settings._pause) {
        settings._pause = false;
        requestAnimationFrame(update);
    }

    settings._hud = true;
    hudButton.innerText = "HUD: SHOWN";
    hud.style.display = "block";
    settings._bodyCount = true;
    bodyCountButton.innerText = "Body Count: SHOWN";
    bodyCount.style.display = "block";
    settings._invertY = false;
    invertButton.innerText = "Invert Y: OFF";

    if (!settings._sliders) {
        settings._sliders = true;
        sliderButton.innerText = "Sliders: ENABLED";
        for (const slider of sliders) {
            slider.style.display = "inline-block";
        }
        for (const sliderNum of sliderNums) {
            sliderNum.style.width = "5vw"
        }
    }
}