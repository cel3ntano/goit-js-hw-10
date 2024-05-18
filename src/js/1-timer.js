import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const startBtn = document.querySelector('button[data-start]');
const dateSelector = document.querySelector('#datetime-picker');
startBtn.disabled = true;
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.show({
        message: '❌ Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    }
  },
};
flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', start);
let isActive = false;

function start() {
  isActive = true;
  controlsState(isActive);
  const timerID = setInterval(() => {
    const endTime = Date.now();
    const deltaTime = userSelectedDate - endTime;

    if (deltaTime > 0) {
      const timeLeft = convertMs(deltaTime);
      Object.keys(timeLeft).forEach(section => {
        const timerElement = document.querySelector(`[data-${section}]`);
        timerElement.textContent = addLeadingZero(timeLeft[section]);
      });
    } else {
      clearInterval(timerID);
      isActive = false;
      controlsState(isActive);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function controlsState(isActive) {
  dateSelector.disabled = isActive;
  dateSelector.style.cursor = isActive ? 'not-allowed' : 'default';
  startBtn.disabled = true;
  startBtn.style.cursor = isActive ? 'not-allowed' : 'default';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
