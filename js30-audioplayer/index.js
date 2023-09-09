import {tracksData} from './data.js';

// const inp = document.querySelector('input');
// inp.addEventListener('pointermove' , () => {
//   console.log('FFFFFFFFFFFF');
// })

let currIndex = 0;
let prevIndex = 0;
let isPlaying = false;
// const playerLength = tracksData.length;

const playBtn = document.querySelector('.play-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');
const pauseBtn = document.querySelector('.pause-track');

const progressLine = document.querySelector('.progress');
// const progressCurrent = document.querySelector('.progress-current');
// const progressToggler = document.querySelector('.progress-toggler');
const currTimeHTML = document.querySelector('.current-time');
const progressInput = document.querySelector('.progress-range');
const progressLineWidth = parseInt(getComputedStyle(progressLine).width);
// progressInput.addEventListener('pointermove', () => {

// })


// console.log('line =',progressLineWidth );

const audios = [];
tracksData.forEach((item) => {
  const audio = new Audio (item.link);
  audios.push(audio);
  audio.addEventListener('loadeddata', () => {
    console.log(audio.duration);
    // console.log(audio.volume);
    audio.volume = 0.5;
    console.log(audio.paused);
  });
  // audio.addEventListener("timeupdate", () => {
  //   const progressWidth = (audio.currentTime * 100) / audio.duration;
  //   currTimeHTML.innerHTML = convertTime(audio.currentTime)
  //   progressCurrent.style.width = `${progressWidth}%`;
  //   progressToggler.style.left = `${progressWidth}%`;
  // });

  // audio.addEventListener("timeupdate", changeProgress)

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    // progressCurrent.style.width = `0%`;
    // progressToggler.style.left = `0%`;
    playNext();
    // audios[currIndex+1].play();
  });

});

setTimeout(() => {
  renderCurrentAudio(audios[0]);
}, 100);



progressInput.addEventListener('change', (e) => {
  e.preventDefault();
  audios[currIndex].currentTime = progressInput.value;
  currTimeHTML.innerHTML = convertTime(audios[currIndex].currentTime);
})





setInterval(() => {
  currTimeHTML.innerHTML = convertTime(audios[currIndex].currentTime)
  progressInput.value = audios[currIndex].currentTime;
}, 500); 

playBtn.addEventListener('click', () => {
 
  console.log('play');
  isPlaying = true;
  audios[currIndex].play();
  playBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  
});

pauseBtn.addEventListener('click', () => {
  console.log('pause');
  isPlaying = false;
  audios[currIndex].pause();
  pauseBtn.classList.add('hidden');
  playBtn.classList.remove('hidden');
});

prevBtn.addEventListener('click', () => {
  console.log('prev');
  playPrev();
  
});

nextBtn.addEventListener('click', () => {
  console.log('next');
  playNext();
  
});

function convertTime(duration) {
  let min = Math.floor(duration / 60);
  let sec = Math.floor(duration - min * 60);
  min = min < 10 ? ('0' + min) : min; 
  sec = sec < 10 ? ('0' + sec) : sec;
  return `${min}:${sec}`;
}

function playNext() {
  prevIndex = currIndex;
  audios[prevIndex].pause();
  audios[prevIndex].currentTime = 0;
  currIndex = currIndex + 1;
  if (currIndex === tracksData.length) {
    currIndex = 0;
  }
  if (isPlaying) {
    audios[currIndex].play(); 
  } else {
    audios[currIndex].pause(); 
  }
  renderCurrentAudio(audios[currIndex]);
}

function playPrev() {
  prevIndex = currIndex;
  audios[prevIndex].pause();
  audios[prevIndex].currentTime = 0;
  currIndex = currIndex - 1;
  if (currIndex < 0) {
    currIndex = tracksData.length - 1;
  }
  if (isPlaying) {
    audios[currIndex].play(); 
  } else {
    audios[currIndex].pause(); 
  }
  renderCurrentAudio(audios[currIndex]);
}

function renderCurrentAudio(audio) {
  progressInput.value = 0;
  progressInput.setAttribute('max', `${audio.duration}`);
  console.log ('render audio');
  renderFullDuration(audio);
  
}

function renderFullDuration(audio) {
  console.log('audio', audio); 
  const fullTime = document.querySelector('.full-time');
  fullTime.innerHTML = convertTime(audio.duration);
}


