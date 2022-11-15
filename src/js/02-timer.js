import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
const INTERVAL = 1000;
let timeId = null;
let finishTime;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    dateDays: document.querySelector('[data-days]'),
    seconds: document.querySelector('[data-seconds]'),
    minutes: document.querySelector('[data-minutes]'),
    hours: document.querySelector('[data-hours]'),
}
refs.startBtn.addEventListener('click', onStart);


const options = {
    minDate: "today",
    enableTime: true,
    time_24hr: true,
    showMonths: 1,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        finishTime=selectedDates[0]
    },
};
flatpickr('#datetime-picker', options);

    function onStart(){
    Notiflix.Notify.success('Старт таймеру');
    Notiflix.Loading.hourglass();

    timeId  = setInterval(() => {

    const curentTime = new Date()
    const time = finishTime - curentTime
    if(time<INTERVAL){
      // if(!Math.round(time/INTERVAL)){

    Notiflix.Loading.remove();  
    Notiflix.Report.success(
        'Час вийшов!!!',
'Обирай нову дату та знову запускай',
        'OK') 
    clearInterval(timeId)
    Notiflix.Notify.success('Час вийшов!!!');
    } 
        const times =convertMs(time);
        updateInterfase(times);
    
    
    }, INTERVAL);
    } 
    function updateInterfase({days,hours,minutes,seconds}){
    refs.dateDays.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}
    function convertMs(ms) {

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
    function addLeadingZero(value){
    return String(value).padStart(2, '0');
}