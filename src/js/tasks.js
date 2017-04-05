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