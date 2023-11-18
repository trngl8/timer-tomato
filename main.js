let timer;
let time = 0;
let isTimerRunning = false;

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 10);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    time = 0;
    updateTimerDisplay();
}

function updateTimer() {
    time++;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(time / (60 * 100));
    const seconds = Math.floor((time % (60 * 100)) / 100);
    const milliseconds = time % 100;
    document.getElementById('timer-output').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}
