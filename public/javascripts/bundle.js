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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);

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
    let el = $('#timer')[0];
    let seconds = "00" + time % 60;
    let minutes = "00" + ((time / 60) | 0);
    el.innerText = minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
}

$('#start-stop-timer')[0].onclick = function (e) {
    if (!timerRunning) {
        countDown();
    } else {
        clearInterval(interval);
        setStartTime();
        displayTime(time);
    }
    timerRunning = !timerRunning;
    e.srcElement.innerText = timerRunning ? 'stop' : 'start';
};

function setStartTime() {
    time = !onBreak ? pomodoroTime : 
                (breakCount % 4 === 3) ? longBreakTime : shortBreakTime;
}

displayTime(time);

/***/ })
/******/ ]);