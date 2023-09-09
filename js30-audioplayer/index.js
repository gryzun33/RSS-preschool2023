import {tracksData} from './data.js';

let currIndex = 0;
let prevIndex = 0;
let isPlaying = false;
// const playerLength = tracksData.length;

const playBtn = document.querySelector('.play-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');
const pauseBtn = document.querySelector('.pause-track');

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
});

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
});

nextBtn.addEventListener('click', () => {
  console.log('next');
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
});


