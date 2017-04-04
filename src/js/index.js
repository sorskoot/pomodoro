require('./timmytools');

const pomodoroTime = 25 * 60;
const shortBreakTime = 5 * 60;
const longBreakTime = 20 * 60;

let time = pomodoroTime;
let onBreak = false;
let breakCount = 0;
let timerRunning = false;
let interval;

function countDown() {
    interval = setInterval(() => {
        displayTime(time);
        time--;
        if (time < 0) {
            clearInterval(interval);
            time = 0;
            displayTime(time);
        }
    }, 1000);
}

function displayTime(time) {
    let el = $('#Timer')[0];
    let seconds = "00" + time % 60;
    let minutes = "00" + ((time / 60) | 0);
    el.innerText = minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
}

$('#StartStopTimer')[0].onclick = function (e) {
    if (!timerRunning) {
        countDown();
    } else {
        clearInterval(interval);
        setStartTime();
        displayTime(time);
    }
    timerRunning = !timerRunning;
    e.srcElement.innerText = timerRunning ? 'Stop' : 'Start';
};

function setStartTime() {
    time = !onBreak ? pomodoroTime : 
                (breakCount % 4 === 3) ? longBreakTime : shortBreakTime;
}

displayTime(time);