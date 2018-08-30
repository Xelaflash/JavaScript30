
/* Get Our Elements */

const player = document.querySelector('.player');

// ca c'est le player
const video = player.querySelector('.viewer');
// barre de progres
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
// ca c'est le button play/pause
const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // ternary version
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  // parseFloat converti la string en nombre
 video.currentTime += parseFloat(this.dataset.skip);
}

// function des sliders volume/vitesse
function handleRangeUpdate() {
  console.log(this.name)
  console.log(this.value)
  video[this.name] = this.value;
}

// function pour la barre de player
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  // calcule le moment de la vid par rapport à taille totale de la barre
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  // mets la vid au bon moment par rapport au click sur la barre
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);

// pour la barre de progres
video.addEventListener('timeupdate', handleProgress);

// pour les buttons avance /recule
skipButtons.forEach(button => button.addEventListener('click', skip));

// pour les sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// pour la barre progres
progress.addEventListener('click', scrub);

//  drag drop sur la barre en plus du click
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);













