require('./timmytools');

const pomodoroTime = 25 * 60;
const shortBreakTime = 5 * 60;
const longBreakTime = 20 * 60;

let time = pomodoroTime;
let onBreak = false;
let breakCount = 0;
let timerRunning = false;
let interval;
let timerElement = $('#timer')[0];

function countDown() {
    interval = setInterval(() => {
        displayTime(time);
        time--;
        if (time < 0) {
            if (onBreak) {
                clearInterval(interval);
                onBreak = false;
                setStartTime();
                timerElement.classList.remove('on-break');
                timerRunning = false;
                changeStartStopButtonText();
            } else {
                breakCount++;
                onBreak = true;
                setStartTime();
                timerElement.classList.add('on-break');
            }
            displayTime(time);
        }
    }, 1000);
};

function displayTime(time) {
    let seconds = "00" + time % 60;
    let minutes = "00" + ((time / 60) | 0);
    timerElement.innerText = minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
};

$('#start-stop-timer')[0].onclick = function (e) {
    if (!timerRunning) {
        countDown();
    } else {
        if (onBreak) {
            onBreak = false;
            timerElement.classList.remove('on-break');
        }
        clearInterval(interval);
        setStartTime();
        displayTime(time);
    }
    timerRunning = !timerRunning;
    changeStartStopButtonText();
};

function changeStartStopButtonText() {
    $('#start-stop-timer')[0].innerText = timerRunning ? 'stop' : 'start';
};

function setStartTime() {
    time = !onBreak ? pomodoroTime :
        (breakCount % 4 === 0) ? longBreakTime : shortBreakTime;
};

displayTime(time);