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
    if (timer.isTimerRunning === false) {
        console.log('started');
        timer.isTimerRunning = true;
        button.innerText = 'Pause';
        if (timer.time === 0) {
            timer.time = setInterval(updateTimer, 10);
        }
    } else {
        console.log('paused');
        pauseTimer();
        button.innerText = 'Start';
    }

}

function pauseTimer() {
    clearTimeout(timer.time);
    timer.isTimerRunning = false;
    updateTimerDisplay()
}

function resetTimer() {
    clearInterval(timer.time);
    timer.isTimerRunning = false;
    timer.time = 0;
    document.getElementById('start-button').innerText = 'Start';
    writeTime(timer.max - timer.time);
}

function updateTimer() {
    timer.time++;
    if (timer.time < timer.max) {
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    if (!timer.isTimerRunning) {
        return;
    }

    if (timer.time >= timer.max) {
        checkPermission();
        resetTimer();
    }

    writeTime(timer.max - timer.time);
}

function settingsPage() {
    window.location.href = "settings.html";
}

function saveSettings() {
    storage.setItem('minutes', document.getElementById('work-time').value);
}

function writeTime(time) {
    const minutes = Math.floor(time / (60 * 100));
    const seconds = Math.floor((time % (60 * 100)) / 100);
    const milliseconds = time % 100;

    let output = document.getElementById('timer-output');
    if (output !== null) {
        output.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }
}
