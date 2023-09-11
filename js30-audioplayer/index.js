import {tracksData} from './data.js';

// const inp = document.querySelector('input');
// inp.addEventListener('pointermove' , () => {
//   console.log('FFFFFFFFFFFF');
// })

let currIndex = 0;
let prevIndex = 0;
let isPlaying = false;


const playBtn = document.querySelector('.play-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');
const pauseBtn = document.querySelector('.pause-track');


const currTimeHTML = document.querySelector('.current-time');
const progressInput = document.querySelector('.progress-range');
const volumeInput = document.querySelector('.volume-range');
const volumeBtn = document.querySelector('.volume-btn');
const volumeNoneBtn = document.querySelector('.volume-none-btn');

const trackName = document.querySelector('.track-name');
const author = document.querySelector('.author');
const authorImage = document.querySelector('.image');


const audios = [];
tracksData.forEach((item) => {
  const audio = new Audio (item.link);
  audios.push(audio);
  audio.addEventListener('loadeddata', () => {
    // console.log(audio.duration);

    audio.volume = 0.5;
    // console.log(audio.paused);
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    playNext();
  });

});

setTimeout(() => {
  // volumeInput.value = '0.5';
  renderCurrentAudio(audios[0],currIndex);
}, 100);



progressInput.addEventListener('change', (e) => {
  e.preventDefault();
  audios[currIndex].currentTime = progressInput.value;
  currTimeHTML.innerHTML = convertTime(audios[currIndex].currentTime);
})

volumeInput.addEventListener('change', (e) => {
  // e.preventDefault();
  audios[currIndex].volume = +volumeInput.value;
  if(volumeInput.value === '0') {
    volumeBtn.classList.add('hidden');
    volumeNoneBtn.classList.remove('hidden');
  } else {
    volumeBtn.classList.remove('hidden');
    volumeNoneBtn.classList.add('hidden');
  }
});





setInterval(() => {
  currTimeHTML.innerHTML = convertTime(audios[currIndex].currentTime)
  progressInput.value = audios[currIndex].currentTime;
}, 500); 

playBtn.addEventListener('click', () => {
 
  // console.log('play');
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
  renderCurrentAudio(audios[currIndex], currIndex);
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
  renderCurrentAudio(audios[currIndex], currIndex);
}

function renderCurrentAudio(audio, currIndex) {
  progressInput.value = 0;
  progressInput.setAttribute('max', `${audio.duration}`);
  // console.log ('render audio');

  trackName.innerHTML = `${tracksData[currIndex].trackName}`;
  author.innerHTML = `${tracksData[currIndex].author}`;
  authorImage.innerHTML = `<img src=${tracksData[currIndex].image} alt=${tracksData[currIndex].author} width='300' height='300'>`
  renderFullDuration(audio);
  
}

function renderFullDuration(audio) {
  console.log('audio', audio); 
  const fullTime = document.querySelector('.full-time');
  fullTime.innerHTML = convertTime(audio.duration);
}
