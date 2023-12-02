let timer = {
    minutes: 25,
    time: 0,
    isTimerRunning: false,
}

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
    updateTimerDisplay();
}

function resetTimer() {
    clearInterval(timer.time);
    timer.isTimerRunning = false;
    timer.time = 0;
    document.getElementById('timer-output').innerText = `${String(timer.time).padStart(2, '0')}:${String(timer.time).padStart(2, '0')}:${String(timer.time).padStart(2, '0')}`;
}

function updateTimer() {
    timer.time++;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    if (!timer.isTimerRunning) {
        return;
    }

    const minutes = Math.floor(timer.time / (60 * 100));
    const seconds = Math.floor((timer.time % (60 * 100)) / 100);
    const milliseconds = timer.time % 100;
    if (minutes === timer.minutes) {
        checkPermission();
        resetTimer();
    }
    document.getElementById('timer-output').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}
