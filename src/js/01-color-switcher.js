
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};
    refs.startBtn.addEventListener('click', onStart);
    refs.stopBtn.addEventListener('click', onStop);

    let intervalId = null;

function onStart() {
    refs.startBtn.disabled = true;  
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onStop() {
    refs.startBtn.disabled = false; 
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

