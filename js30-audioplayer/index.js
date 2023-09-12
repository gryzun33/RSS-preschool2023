import {tracksData} from './data.js';

let currIndex = 0;
let prevIndex = 0;
let isPlaying = false;
let currVolume = 0.5;
let isRepeat = false;
let isShuffle = false;


const playBtn = document.querySelector('.play-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');
const pauseBtn = document.querySelector('.pause-track');


const currTimeHTML = document.querySelector('.current-time');
const progressInput = document.querySelector('.progress-range');
const volumeInput = document.querySelector('.volume-range');
const volumeBtn = document.querySelector('.volume-btn');
const volumeNoneBtn = document.querySelector('.volume-none-btn');

const repeatBtn = document.querySelector('.repeat');
const shuffleBtn = document.querySelector('.shuffle');

const trackName = document.querySelector('.track-name');
const author = document.querySelector('.author');
const authorImage = document.querySelector('.image');


const audios = [];
tracksData.forEach((item, i) => {
  const audio = new Audio (item.link);
  audios.push(audio);
  audio.addEventListener('loadeddata', () => {

    audio.volume = currVolume;
    if (i === 0) {
      renderCurrentAudio(audios[0],0);
    }
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    playNext();
  });

});

progressInput.addEventListener('change', (e) => {
  e.preventDefault();
  audios[currIndex].currentTime = progressInput.value;
  currTimeHTML.innerHTML = convertTime(audios[currIndex].currentTime);
})

volumeInput.addEventListener('change', (e) => {

  audios[currIndex].muted = false;
  audios[currIndex].volume = +volumeInput.value;

  if(volumeInput.value === '0') {
    currVolume = 0;
    volumeBtn.classList.add('hidden');
    volumeNoneBtn.classList.remove('hidden');
  } else {
    volumeBtn.classList.remove('hidden');
    volumeNoneBtn.classList.add('hidden');
  }
});

volumeBtn.addEventListener('click', () => {
  currVolume = +volumeInput.value;
  volumeInput.value = 0;
  audios[currIndex].muted = true;
  volumeBtn.classList.add('hidden');
  volumeNoneBtn.classList.remove('hidden');
});

volumeNoneBtn.addEventListener('click', () => {
  if (currVolume > 0) {
    volumeInput.value = currVolume;
    audios[currIndex].muted = false;
    volumeBtn.classList.remove('hidden');
    volumeNoneBtn.classList.add('hidden');
  }
});


repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle('active');
  if(isRepeat) {
    isShuffle = false;
    shuffleBtn.classList.remove('active');
  } 
});

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active');

  if (isShuffle) {
    isRepeat = false;
    repeatBtn.classList.remove('active');
  }
 
});

setInterval(() => {
  currTimeHTML.innerHTML = convertTime(audios[currIndex].currentTime)
  progressInput.value = audios[currIndex].currentTime;
}, 500); 

playBtn.addEventListener('click', () => {
  isPlaying = true;
  audios[currIndex].play();
  playBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  
});

pauseBtn.addEventListener('click', () => {
  isPlaying = false;
  audios[currIndex].pause();
  pauseBtn.classList.add('hidden');
  playBtn.classList.remove('hidden');
});

prevBtn.addEventListener('click', () => {
  playPrev(); 
});

nextBtn.addEventListener('click', () => { 
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

  if (isRepeat) {
    currIndex = prevIndex;
  } else if (isShuffle) {
    currIndex = getRandomIndex(prevIndex);
  } else {
      currIndex = currIndex + 1;
    if (currIndex === tracksData.length) {
      currIndex = 0;
    }
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
  if (isRepeat) {
    currIndex = prevIndex;
  } else if (isShuffle) {
    currIndex = getRandomIndex(currInd);
  } else {
    currIndex = currIndex - 1;
    if (currIndex < 0) {
      currIndex = tracksData.length - 1;
    }
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
  trackName.innerHTML = `${tracksData[currIndex].trackName}`;
  author.innerHTML = `${tracksData[currIndex].author}`;
  authorImage.innerHTML = `<img src=${tracksData[currIndex].image} alt=${tracksData[currIndex].author} width='300' height='300'>`
  renderFullDuration(audio);
}

function renderFullDuration(audio) {
  const fullTime = document.querySelector('.full-time');
  fullTime.innerHTML = convertTime(audio.duration);
}

function getRandomIndex(currInd) {
  const l = tracksData.length;
  let randomInd;
  do {
    randomInd = Math.floor(Math.random() * l);
    console.log ('randomind', randomInd);
  } while (randomInd === currInd)
  return randomInd;
}