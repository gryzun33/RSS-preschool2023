export function saveGame(state, timeData) {
  const fullTime = timeData.min * 60 + timeData.sec;
  let game = {
    timeMin: timeData.min, 
    timeSec: timeData.sec, 
    fullTime: fullTime,
    score: state.count
  }
  let games = JSON.parse(localStorage.getItem('gamesLine98'));
  if (!games) {
    games = [];
  }
  games.push(game);
  localStorage.setItem('gamesLine98', JSON.stringify(games));
}