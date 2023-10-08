export function renderBestScores() {
  const lastTable = document.querySelector('.best-list');
  lastTable.innerHTML = `
    <tr>
      <th>N</th>
      <th>Score</th>
      <th>Time</th>
    </tr>
  `;
  let l = 0;
  const scores = JSON.parse(localStorage.getItem('gamesLine98'));
  if (scores) {
    scores.sort((a,b) => {
      if (b.score > a.score) return 1;
      if (a.score > b.score) return -1;
      return a.fullSec > b.fullTime ? 1 : -1;
    });
    l = (scores.length <= 10) ? scores.length : 10;
    for (let i = 0; i < l; i++) {
      const min = (scores[i].timeMin < 10) ? '0' + scores[i].timeMin : scores[i].timeMin;
      const sec = (scores[i].timeSec < 10) ? '0' + scores[i].timeSec : scores[i].timeSec;
      const time = `${min} : ${sec}`;
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${i+1}</td>
        <td>${scores[i].score}</td>
        <td>${time}</td>
      `;
      lastTable.append(tableRow);
    }
  }
  while (l < 10) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${l+1}</td>
      <td>---</td>
      <td>---</td>
    `;
    lastTable.append(tableRow);
    l++;
  }
}