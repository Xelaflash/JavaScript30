let countDown;
const timerDisplay = Document.query

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  console.log({now, then});
  counstDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if to stop
    if(secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    // display
    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  console.log({minutes, remainderSeconds});;
}
