let storage = window.localStorage;

const DEFAULT_MINUTES = storage.getItem('minutes') || 25;

let timer = {
    minutes: DEFAULT_MINUTES,
    max: DEFAULT_MINUTES * 60 * 100,
    time: 0,
    isTimerRunning: false,
}

writeTime(timer.max - timer.time);
console.log(DEFAULT_MINUTES);
//default, granted, denied
console.log(Notification.permission)

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

function startTimer() {
    let button = document.getElementById('start-button');
    if (timer.isTimerRunning === false && timer.time < timer.max) {
        timer.isTimerRunning = true;
        if (timer.time === 0) {
            timer.time = setInterval(updateTimer, 10);
            console.log(`started at ${getTimeString(timer.time)}`);
        }
        button.innerText = 'Pause';
    } else if (timer.isTimerRunning === true && timer.time < timer.max) {
        timer.isTimerRunning = false;
        clearTimeout(timer.time);
        console.log(`paused at ${getTimeString(timer.time)}`);
        button.innerText = 'Resume';
    } else {
        clearTimeout(timer.time);
        timer.isTimerRunning = false;
        updateTimerDisplay();
        console.log(`paused at ${getTimeString(timer.time)}`);
        button.innerText = 'Start';
    }

}

function resetTimer() {
    clearTimeout(timer.time);
    clearInterval(timer.time);
    timer.isTimerRunning = false;
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
    if (!timer.isTimerRunning) {
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
