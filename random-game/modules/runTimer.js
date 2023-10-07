export function runTimer(timeData, time) {
  timeData.timerId = setInterval(() => {
    if (timeData.sec === 59) {
      timeData.min += 1;
      timeData.sec = 0;
    } else {
      timeData.sec += 1;
    }
    timeData.currMin = (parseInt(timeData.min, 10) < 10 ? '0' : '') + timeData.min;
    timeData.currSec = (parseInt(timeData.sec, 10) < 10 ? '0' : '') + timeData.sec;
    time.innerHTML = `${timeData.currMin} : ${timeData.currSec}`;
  }, 1000);
}