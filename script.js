function updateClock() {
    const now = new Date();
    
    // Relógio Digital
    const digitalClock = document.getElementById('digitalClock');
    digitalClock.textContent = now.toLocaleTimeString('pt-BR', { hour12: false });
    
    // Relógio Analógico
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;
    
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');
    
    const secondDegrees = (seconds / 60) * 360 + 90;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
    const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
    
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // Inicializa imediatamente

// Cronômetro
let stopwatchInterval;
let seconds = 0, minutes = 0, hours = 0;
let isRunning = false;

const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateStopwatch() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
    stopwatchDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Iniciar';
    } else {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        startStopBtn.textContent = 'Parar';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    stopwatchDisplay.textContent = '00:00:00';
    startStopBtn.textContent = 'Iniciar';
    isRunning = false;
});
