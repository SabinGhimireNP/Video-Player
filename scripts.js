// Constant variable decratation

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = document.querySelector(".fullscreen");
const mute = document.querySelector(".muted");

let mouseDown = false;
let fullscr = false;

window.onload = () => {
  video.muted = true;
  video.play().catch((e) => {
    // Autoplay was prevented
    console.log("Autoplay blocked:", e);
  });
};

//Functions

function TogglePlay() {
  console.log("pressed");
  const method = video.paused ? "play" : "pause";
  video[method]();
  UpdateButton();
}

function UpdateButton() {
  const icon = this.paused ? "▶" : "❚❚";
  toggle.textContent = icon;
  //   alert("Paused/Play");
}

function Skip() {
  //   console.log("clicked");
  video.currentTime += parseFloat(this.dataset.skip);
}

function RangeUpdate() {
  video[this.name] = this.value;
  //   console.log(this.value);
}

function scrub(e) {
  //   console.log("clickled");
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
function HandelProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  // console.log(progressBar.style.flexBasis);
}

function ToggleMute() {
  if (video.muted) {
    video.muted = false;
    mute.textContent = "🔊";
  } else {
    video.muted = true;
    mute.textContent = "🔇";
  }
}

function fullscreenReq() {
  if (!fullscr) {
    player.requestFullscreen();
    fullscr = true;
  } else {
    video.exitFullscreen();
    fullscr = false;
  }
}

// Event Listener
video.addEventListener("click", TogglePlay);
video.addEventListener("timeupdate", HandelProgress);
video.addEventListener("play", UpdateButton);
video.addEventListener("pause", UpdateButton);
mute.addEventListener("click", ToggleMute);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

toggle.addEventListener("click", TogglePlay);
skipButtons.forEach((e) => e.addEventListener("click", Skip));
ranges.forEach((e) => e.addEventListener("change", RangeUpdate));
fullscreen.addEventListener("click", fullscreenReq);
