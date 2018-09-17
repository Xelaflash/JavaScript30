let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
  // we clear all existing timer
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  // console.log({now, then});
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if to stop
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display
    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours =  (minutes >= 60) ? Math.floor(minutes / 60) :  '';

  const remainderMinutes = minutes % 60;
  const remainderSeconds = seconds % 60;

  const display = `${hours > 0 ? hours : '0'}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds} `;

  document.title = display;
  timerDisplay.textContent = display;
  // console.log({minutes, remainderSeconds});
};

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`; // 24H clock style
  // endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`; // 12H clock style
  // console.log(end);
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  // console.log(seconds);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  // console.log(mins);
  timer(mins * 60);
  this.reset();
});
