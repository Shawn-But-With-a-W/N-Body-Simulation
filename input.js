resizePanel();

window.addEventListener("resize", resizePanel);

function resizePanel() {
    document.getElementById("input-panel").style.height = `${canvas.height * 0.6}px`;
    document.getElementById("input-panel").style.width = `${canvas.width * 0.2}px`;
    document.getElementById("input-panel").style.top = `${window.innerHeight*0.2}px`;
}

