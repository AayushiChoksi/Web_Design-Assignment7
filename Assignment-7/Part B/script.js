let intervalId;
let running = false;
let time = 0;

function updateTime() {
    const currentDate = new Date();
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    document.getElementById('time').innerText =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('datepicker').valueAsDate = currentDate;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
    if (!running) {
        running = true;
        intervalId = setInterval(() => {
            time++;
            updateTime();
        }, 1000);
    }
}

function stop() {
    clearInterval(intervalId);
    running = false;
}

async function reset() {
    stop();
    time = 0;
    updateTime();
}

updateTime();
