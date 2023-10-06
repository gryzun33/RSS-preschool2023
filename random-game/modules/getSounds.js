export function getSounds() {
  const clikOnBallSound = document.createElement('audio');
  clikOnBallSound.src = './assets/audio/knopka-start.mp3';

  const clikOnBoxSound = document.createElement('audio');
  clikOnBoxSound.src = './assets/audio/knopka-end.mp3';

  const removeLinesSound = document.createElement('audio');
  removeLinesSound.src = './assets/audio/knopka-remove.mp3';

  const wrongBoxSound = document.createElement('audio');
  wrongBoxSound.src = './assets/audio/wrong-short.mp3';

  const gameOverSound = document.createElement('audio');
  gameOverSound.src = './assets/audio/game-over.mp3';

  const sounds = {
    clickOnBall: clikOnBallSound,
    clikOnBox: clikOnBoxSound,
    removeLines: removeLinesSound,
    wrongBox: wrongBoxSound,
    gameOver: gameOverSound,  
  }

  return sounds;
}





