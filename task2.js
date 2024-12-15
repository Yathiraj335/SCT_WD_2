let timer;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

// References to HTML elements
const display = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');

// Event listeners for buttons
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('lap-btn').addEventListener('click', recordLap);

// Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);  // Update time every 10 milliseconds
    }
}

// Pause the timer
function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

// Reset the timer
function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    startTime = 0;
    laps = [];
    displayTime(0);
    lapsList.innerHTML = '';  // Clear lap times
}

// Record a lap
function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        displayLapTimes();
    }
}

// Update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
}

// Format and display the time
function displayTime(milliseconds) {
    const ms = milliseconds % 1000;
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    display.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
}

// Format numbers to ensure double digits (e.g., 01, 09)
function pad(num, size = 2) {
    let s = "000" + num;
    return s.substr(s.length - size);
}

// Display lap times
function displayLapTimes() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatLapTime(lap)}`;
        lapsList.appendChild(li);
    });
}

// Format lap time
function formatLapTime(lapTime) {
    const ms = lapTime % 1000;
    const totalSeconds = Math.floor(lapTime / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
}
