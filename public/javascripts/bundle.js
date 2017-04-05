/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var tasks = [
    { pomodoroCount: 1, description: 'Demo pomodoro 1'},
    { pomodoroCount: 3, description: 'Another Demo pomodoro'},
    { pomodoroCount: 5, description: 'A Demo pomodoro with a longer description that all the others'},
    { pomodoroCount: 2, description: 'Demo pomodoro 4'},
];

module.exports = {
    getTasks: function(){
        return tasks;
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function () {
    module.exports = function templater(template, replacement) {
        //const regex = /{{(\w*(?:\.\w+)*)}}/g;
        const regex = /{{(\w*(?:(?::|\.)(?:\$|\w)+)*)}}/g;
        let m, result = template;
        while ((m = regex.exec(template)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            var repl = m[1].split('.').reduce((obj, property) => obj[property], replacement);
            if (repl) {
                result = result.replace(m[0], repl);
            }
        }
        return result;
    }
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

window.$ = (selector) => document.querySelectorAll(selector);

Object.assign(NodeList.prototype, {
    addEventListener(event, handler) {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener(event, handler);
        }
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
var templater = __webpack_require__(1);
var tasks = __webpack_require__(0);

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

function displayTasks() {
    var availableTasks = tasks.getTasks();
    var template = $('#task-template')[0].innerHTML;
    var taskList = $('#task-list')[0];
    for (var i = 0; i < availableTasks.length; i++) {
        var task = availableTasks[i];
        var html = templater(template,
            {
                text: task.description, estimate: task.pomodoroCount, spend: "0"
            });
        taskList.innerHTML = taskList.innerHTML + html;
    }
}

displayTime(time);
displayTasks();


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map