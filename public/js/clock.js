var clockElement = document.getElementById('clock');
clockElement.textContent = new Date().toString();
function clock() {
    clockElement.textContent = new Date().toString();
}

setInterval(clock, 1000);