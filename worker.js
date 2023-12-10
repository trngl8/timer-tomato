// worker.js
let counter = 0;

function timerFunction() {
    counter++;
    postMessage(counter);
}

setInterval(timerFunction, 10);
