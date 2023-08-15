let settings = {
    radius : 50,
    mass : 10**15,
    colour : "#71aff8",
    pos : {x:0, y:0},
    vel : {x:0, y:0},
    G : 0.0000000000667428, // Gravitational constant, used in calculation of force
    t : 1, // Time interval between consecutive calculations
    softening : 500, // Used to prevent the denominator in GMm/r^2 from going to 0 and producing infinite force
    trailLength : 4,
    intervalDelay : 10,
    _pause : false,
};

document.getElementById("pause").addEventListener("click", pause);

function pause() {
    if (settings._pause) {
        interval = setInterval(update, settings.intervalDelay);
        settings._pause = false;
    }
    else {
        clearInterval(interval);
        settings._pause = true;
    }
}

