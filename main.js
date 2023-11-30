let timer;
let time = 0;
let isTimerRunning = false;

//default, granted, denied
console.log(Notification.permission)

const imageSlider = document.getElementById('image-slider');

let currentIndex = 0;

imageSlider.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageSlider.children.length;
    showImage(currentIndex);
});

showImage(currentIndex);

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
    if (minutes === 25) {
        checkPermission();
        resetTimer();
    }
    document.getElementById('timer-output').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function showImage(index) {
    const translateValue = -index * 100 + '%';
    imageSlider.style.transform = `translateX(${translateValue})`;
}
