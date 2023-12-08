let storage = window.localStorage;

const DEFAULT_MINUTES = storage.getItem('minutes') || 25;

let timer = {
    timerId: null,
    minutes: DEFAULT_MINUTES,
    max: DEFAULT_MINUTES * 60 * 100,
    startedAt: 0,
    pausedAt: 0,
    time: 0,
    isRunning: false,
    timeout: 10 // milliseconds
}

writeTime(timer.max - timer.time);

function showNotification() {
    const notification = new Notification("Alarm", {
        body: 'Time is out',
        icon: "images/alarm.svg"
    })

    notification.onclick = (e) => {
        window.location.href = "#";
    }

    console.log("notification sent");
}

function checkPermission() {
    //default, granted, denied
    console.log(Notification.permission)
    if(Notification.permission === "granted") {
        showNotification();
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if(permission === "granted") {
                showNotification()
            }
        })
    }
}

function processTimer() {
    let button = document.getElementById('start-button');
    if (timer.isRunning === false) {
        // Start timer
        timer.timerId = setInterval(updateTimer, timer.timeout);
        if (timer.startedAt === 0) {
            timer.startedAt = Date.now();
            console.log(`started at ${getTimeString(timer.time)}`);
        } else {
            // Resume timer
            console.log(`resumed at ${getTimeString(timer.time)}`);
        }
        timer.pausedAt = Date.now();
        timer.isRunning = true;
        button.innerText = 'Pause';
        return;
    }
    // Pause timer
    clearInterval(timer.timerId);
    timer.timerId = null;
    timer.isRunning = false;
    console.log(`paused at ${getTimeString(timer.time)}`);
    button.innerText = 'Resume';
}

function resetTimer() {
    clearTimeout(timer.timerId);
    clearInterval(timer.timerId);
    timer.isRunning = false;
    timer.time = 0;
    console.log(`reset at ${getTimeString(timer.time)}`);
    document.getElementById('start-button').innerText = 'Start';
    writeTime(timer.max - timer.time)
}

function updateTimer() {
    timer.time++;
    if (timer.time <= timer.max) {
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    if (timer.time >= timer.max) {
        checkPermission();
        resetTimer();
    }
    if (!timer.isRunning) {
        return;
    }

    writeTime(timer.max - timer.time);
}

function settingsPage() {
    window.location.href = "settings.html";
}

function saveSettings() {
    storage.setItem('minutes', document.getElementById('work-time').value);
}

function getTimeString(time) {
    const minutes = Math.floor(time / (60 * 100));
    const seconds = Math.floor((time % (60 * 100)) / 100);
    const milliseconds = time % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`
}

function writeTime(time) {
    let output = document.getElementById('timer-output');
    if (output !== null) {
        output.innerText = getTimeString(time);
    }
}
