import { saveGame } from "./saveGame.js";

export function onGameOver(state, timeData, sounds, time, overlay, startBtn, gameOverBox) {
  if (state.isVolume) {
    sounds.gameOver.currentTime = 0;
    sounds.gameOver.play();
  }
  clearInterval(timeData.timerId);
  state.isPlaying = 'gameover';
  startBtn.innerHTML = 'Start game';
  overlay.classList.add('overlay-show');
  gameOverBox.classList.remove('hidden');
  gameOverBox.innerHTML = `
    <p class="gameover__title">GAME OVER!</p>
    <p class="gameover__time">Your time is ${time.innerHTML}</p>
    <p class="gameover__score">Your score is ${+state.count}</p>  
  `;
  overlay.addEventListener('transitionend', showGameOver);

  function showGameOver() {
    gameOverBox.classList.add('inner-show');
    overlay.removeEventListener('transitionend', showGameOver);
  }
  
  saveGame(state, timeData); 
}